import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { sendOwnerNotification } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      firstName,
      lastName,
      email,
      phone,
      company,
      kraPin,
      packageName,
      packagePrice,
      paymentPreference,
      timeline,
      brief,
      category,
    } = body;
    const token = body["cf-turnstile-response"] || body.token;

    // Honeypot check
    if (body._hp_security_check) {
      return NextResponse.json({ error: "Automated submission rejected." }, { status: 400 });
    }

    const clientIp =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      undefined;

    // 1. Verify Turnstile token
    const verification = await verifyTurnstileToken({
      token,
      expectedAction: "invoice",
      clientIp,
    });

    if (!verification.success) {
      return NextResponse.json(
        { error: verification.error || "Security verification failed. Please try again." },
        { status: 403 }
      );
    }

    // 2. Validate essentials
    const clientName = name || `${firstName || ""} ${lastName || ""}`.trim();
    if (!clientName || !email || !phone) {
      return NextResponse.json(
        { error: "Full name, email address, and phone number are required." },
        { status: 400 }
      );
    }

    const invoiceNumber = `APH-INV-${Math.floor(10000 + Math.random() * 90000)}`;
    const recipientEmail = "enquiries@apexhaveninvestments.com";

    // 3. Dispatch structured notification to the enquiries inbox
    await sendOwnerNotification({
      subject: `Invoice Request [${invoiceNumber}]: ${packageName || "Advisory Package"} (${packagePrice || "Fixed Fee"}) - ${clientName}`,
      senderName: clientName,
      senderEmail: email,
      senderPhone: phone,
      recipientEmail,
      details: {
        "Invoice Reference": invoiceNumber,
        "Package / Service": packageName || "Property Advisory Package",
        "Published Fee": packagePrice || "As quoted",
        "Category": category || "Property Advisory",
        ...(company ? { "Company / Organization": company } : {}),
        ...(kraPin ? { "KRA PIN / Tax ID": kraPin } : {}),
        ...(paymentPreference ? { "Preferred Payment Method": paymentPreference } : {}),
        ...(timeline ? { "Target Timeline": timeline } : {}),
        "Destination Inbox": recipientEmail,
        "Request Time": new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" }),
      },
      messageText: brief || "No additional notes provided.",
    });

    return NextResponse.json({
      success: true,
      reference: invoiceNumber,
      recipient: recipientEmail,
      message: "Invoice request registered successfully. Our team will issue your proforma invoice within 24 business hours.",
    });
  } catch (err: unknown) {
    console.error("[Invoice API Error]:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your invoice request." },
      { status: 500 }
    );
  }
}
