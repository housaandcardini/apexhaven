import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { sendOwnerNotification } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      lookingFor,
      details,
      message,
    } = body;
    const token = body["cf-turnstile-response"] || body.token;

    const clientIp =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      undefined;

    // 1. Verify Turnstile token with expectedAction: "consultation"
    const verification = await verifyTurnstileToken({
      token,
      expectedAction: "consultation",
      clientIp,
    });

    if (!verification.success) {
      return NextResponse.json(
        { error: verification.error || "Turnstile verification failed" },
        { status: 403 }
      );
    }

    // 2. Validate essential fields
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Full name, email, and phone are required." },
        { status: 400 }
      );
    }

    // Generate unique reference
    const reference = `APH-${Date.now().toString().slice(-6)}`;

    // 3. Dispatch notification to consultations inbox with cc to property advisory
    await sendOwnerNotification({
      recipientEmail: "consultations@apexhaveninvestments.com",
      ccEmail: "propertyadvisory@apexhaveninvestments.com",
      subject: `Property Enquiry / Consultation Match [${reference}]`,
      senderName: fullName,
      senderEmail: email,
      senderPhone: phone,
      details: {
        "Enquiry Reference": reference,
        "Property Category": lookingFor || "General Property",
        "Preferred Location": details?.location || "Not specified",
        "Budget Range": details?.budget || "Not specified",
        "Target Development / Link": details?.propertyLinkOrName || "None provided",
        "Timeline": details?.timeline || "Standard",
        "Submission Time": new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" }),
      },
      messageText: message || details?.notes,
    });

    return NextResponse.json({
      success: true,
      reference,
      message: "Your property enquiry has been successfully registered.",
    });
  } catch (err: unknown) {
    console.error("[Consultation API Error]:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while submitting your enquiry." },
      { status: 500 }
    );
  }
}
