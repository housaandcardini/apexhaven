import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { sendOwnerNotification } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      servicePackage,
      propertyType,
      rooms,
      location,
      timeline,
      budget,
      brief,
      category,
      organization,
    } = body;
    const token = body["cf-turnstile-response"] || body.token;

    // Honeypot trap: reject if automated bot filled invisible field
    if (body._hp_security_check) {
      return NextResponse.json({ error: "Automated submission rejected." }, { status: 400 });
    }

    // Get client IP for Cloudflare verification
    const clientIp =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      undefined;

    // 1. Verify Turnstile token
    const verification = await verifyTurnstileToken({
      token,
      expectedAction: "quote",
      clientIp,
    });

    if (!verification.success) {
      return NextResponse.json(
        { error: verification.error || "Security verification failed. Please try again." },
        { status: 403 }
      );
    }

    // 2. Validate essential fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Full name, email address, and phone number are required." },
        { status: 400 }
      );
    }

    const isInteriorDesign =
      category === "interior-design" ||
      !category ||
      (servicePackage && /interior|room|concept|fit-out|joinery/i.test(servicePackage));

    const prefix = isInteriorDesign ? "APH-ID" : "APH-RFQ";
    const rfqNumber = `${prefix}-${Math.floor(10000 + Math.random() * 90000)}`;

    const recipientEmail = isInteriorDesign
      ? "interiordesign@apexhaveninvestments.com"
      : "enquiries@apexhaveninvestments.com";

    // 3. Dispatch structured notification to the designated inbox
    await sendOwnerNotification({
      subject: `Quotation Request [${rfqNumber}]: ${servicePackage || "Interior Design"} - ${name}`,
      senderName: name,
      senderEmail: email,
      senderPhone: phone,
      recipientEmail,
      details: {
        "Quotation Reference": rfqNumber,
        "Package / Service": servicePackage || "Interior Design Solution",
        ...(propertyType ? { "Property / Space Type": propertyType } : {}),
        ...(rooms ? { "Target Rooms / Scope": rooms } : {}),
        ...(location ? { "Project Location": location } : {}),
        ...(timeline ? { "Target Timeline": timeline } : {}),
        ...(budget ? { "Estimated Budget": budget } : {}),
        ...(organization ? { "Company / Organization": organization } : {}),
        "Destination Inbox": recipientEmail,
        "Submission Time": new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" }),
      },
      messageText: brief || "No additional brief notes provided.",
    });

    return NextResponse.json({
      success: true,
      reference: rfqNumber,
      recipient: recipientEmail,
      message: "Quotation request registered successfully. Our team will contact you within 24 business hours.",
    });
  } catch (err: unknown) {
    console.error("[Quote API Error]:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your quotation request." },
      { status: 500 }
    );
  }
}
