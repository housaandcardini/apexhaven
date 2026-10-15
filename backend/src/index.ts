/**
 * Cloudflare Worker: Apex Haven Enquiries Dispatcher
 *
 * Receives verified inquiries from the Apex Haven website and forwards
 * them directly to enquiries@apexhaveninvestments.com using MailChannels
 * (zero-config, free transactional email built for Cloudflare Workers).
 */

export interface Env {
  DESTINATION_EMAIL?: string;
  ALLOWED_ORIGIN?: string;
}

interface EnquiryPayload {
  to?: string;
  senderName?: string;
  senderEmail?: string;
  senderPhone?: string;
  subject?: string;
  html?: string;
  details?: Record<string, string>;
  messageText?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") || "*";

    const corsHeaders = {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    try {
      const data = (await request.json()) as EnquiryPayload;
      const destination = data.to || env.DESTINATION_EMAIL || "enquiries@apexhaveninvestments.com";
      const subject = data.subject || "New Enquiry from Apex Haven Investments Website";

      const htmlContent =
        data.html ||
        `
        <h2>Apex Haven Website Enquiry</h2>
        <p><strong>From:</strong> ${data.senderName || "Unknown"} (${data.senderEmail || "N/A"})</p>
        <p><strong>Phone:</strong> ${data.senderPhone || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${data.messageText || "No text provided"}</p>
      `;

      // Dispatch via MailChannels (integrated with Cloudflare Workers)
      const mailchannelsRes = await fetch("https://api.mailchannels.net/tx/v1/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: destination, name: "Apex Haven Enquiries" }],
            },
          ],
          from: {
            email: "enquiries@apexhaveninvestments.com",
            name: "Apex Haven Website",
          },
          reply_to: {
            email: data.senderEmail || "enquiries@apexhaveninvestments.com",
            name: data.senderName || "Website Client",
          },
          subject,
          content: [
            {
              type: "text/html",
              value: htmlContent,
            },
          ],
        }),
      });

      if (!mailchannelsRes.ok) {
        const errorText = await mailchannelsRes.text();
        console.error("MailChannels dispatch failed:", mailchannelsRes.status, errorText);
        return new Response(
          JSON.stringify({
            success: false,
            error: `Mail delivery failed (${mailchannelsRes.status})`,
            details: errorText,
          }),
          { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: `Enquiry successfully delivered to ${destination}`,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Internal error";
      return new Response(JSON.stringify({ success: false, error: message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
