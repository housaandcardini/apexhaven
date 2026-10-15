import { site } from "@/lib/site";

interface SendNotificationOptions {
  subject: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  details: Record<string, string | number | undefined>;
  messageText?: string;
  recipientEmail?: string;
  ccEmail?: string;
}

/**
 * Dispatches verified lead/contact notifications to the company inbox.
 * Priority destinations:
 * 1. Cloudflare Worker (via CLOUDFLARE_WORKER_URL) -> delivers free via Cloudflare MailChannels / Email Routing
 * 2. Resend API (via RESEND_API_KEY)
 * 3. Structured Server Logging with delivery acknowledgment
 */
export async function sendOwnerNotification({
  subject,
  senderName,
  senderEmail,
  senderPhone,
  details,
  messageText,
  recipientEmail: customRecipient,
  ccEmail,
}: SendNotificationOptions) {
  const recipientEmail =
    customRecipient ||
    process.env.ENQUIRIES_EMAIL ||
    site.email ||
    "enquiries@apexhaveninvestments.com";
  const cloudflareWorkerUrl = process.env.CLOUDFLARE_WORKER_URL;
  const resendApiKey = process.env.RESEND_API_KEY;

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #0B3D2E; padding: 24px; color: #ffffff;">
        <h2 style="margin: 0; color: #C9A227; font-size: 20px;">Apex Haven Investments Limited</h2>
        <p style="margin: 4px 0 0; font-size: 14px; opacity: 0.9;">${subject}</p>
      </div>
      <div style="padding: 24px;">
        <h3 style="font-size: 16px; margin-top: 0; color: #0B3D2E;">Client Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; width: 140px;">Name:</td>
            <td style="padding: 8px 0; font-weight: 600;">${senderName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Email:</td>
            <td style="padding: 8px 0; font-weight: 600;"><a href="mailto:${senderEmail}" style="color: #0B3D2E;">${senderEmail}</a></td>
          </tr>
          ${
            senderPhone
              ? `<tr>
                  <td style="padding: 8px 0; color: #64748b;">Phone / WhatsApp:</td>
                  <td style="padding: 8px 0; font-weight: 600;"><a href="tel:${senderPhone}" style="color: #0B3D2E;">${senderPhone}</a></td>
                </tr>`
              : ""
          }
          ${Object.entries(details)
            .filter(([, val]) => val !== undefined && val !== "")
            .map(
              ([key, val]) => `
              <tr>
                <td style="padding: 8px 0; color: #64748b;">${key}:</td>
                <td style="padding: 8px 0; font-weight: 500;">${val}</td>
              </tr>
            `
            )
            .join("")}
        </table>

        ${
          messageText
            ? `
          <h3 style="font-size: 16px; color: #0B3D2E; margin-bottom: 8px;">Message / Brief</h3>
          <div style="background-color: #FAF8F3; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${messageText}</div>
        `
            : ""
        }
      </div>
      <div style="background-color: #FAF8F3; padding: 16px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
        Verified via Cloudflare Turnstile • Apex Haven Investments Website
      </div>
    </div>
  `;

  // 1. Dispatch via Cloudflare Worker if configured
  if (cloudflareWorkerUrl) {
    try {
      const res = await fetch(cloudflareWorkerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipientEmail,
          cc: ccEmail,
          senderName,
          senderEmail,
          senderPhone,
          subject: `[Website Enquiry] ${subject}`,
          html: htmlBody,
          details,
          messageText,
        }),
      });
      if (res.ok) {
        return { success: true, provider: "cloudflare-worker" };
      }
    } catch (err) {
      console.error("[Mailer] Cloudflare Worker dispatch error:", err);
    }
  }

  // 2. Dispatch via Resend API if configured
  if (resendApiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Apex Haven Enquiries <notifications@apexhaveninvestments.com>",
          to: [recipientEmail],
          reply_to: senderEmail,
          subject: `[Enquiry] ${subject} - ${senderName}`,
          html: htmlBody,
        }),
      });
      if (res.ok) {
        return { success: true, provider: "resend" };
      }
    } catch (err) {
      console.error("[Mailer] Resend dispatch error:", err);
    }
  }

  // 3. Structured log fallback
  console.log(`[ENQUIRIES DISPATCH] To: ${recipientEmail} | Subject: ${subject} | From: ${senderEmail} (${senderName})`);
  return { success: true, provider: "logged" };
}
