import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { sendOwnerNotification } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;
    const token = body["cf-turnstile-response"] || body.token;

    // Get client IP for Cloudflare verification
    const clientIp =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      undefined;

    // 1. Verify Turnstile token
    const verification = await verifyTurnstileToken({
      token,
      expectedAction: "contact",
      clientIp,
    });

    if (!verification.success) {
      return NextResponse.json(
        { error: verification.error || "Turnstile verification failed" },
        { status: 403 }
      );
    }

    // 2. Validate essential fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // 3. Dispatch notification to owner inbox
    await sendOwnerNotification({
      subject: `Website Contact Form: ${service || "General Inquiry"}`,
      senderName: name,
      senderEmail: email,
      senderPhone: phone,
      details: {
        "Service of Interest": service || "General Inquiry",
        "Submission Time": new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" }),
      },
      messageText: message,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you. Your message has been sent to our team.",
    });
  } catch (err: unknown) {
    console.error("[Contact API Error]:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
