/**
 * Cloudflare Turnstile canonical server-side siteverify helper.
 * Strictly adheres to Cloudflare Turnstile Spin specification:
 * https://developers.cloudflare.com/turnstile/spin/prompt.md
 */

export type TurnstileVerifyResult =
  | { success: true; hostname: string; action: string }
  | { success: false; error: string; errorCodes?: string[] };

export async function verifyTurnstileToken({
  token,
  expectedAction,
  clientIp,
}: {
  token: unknown;
  expectedAction: string;
  clientIp?: string;
}): Promise<TurnstileVerifyResult> {
  const secret = process.env.TURNSTILE_SECRET;


  // If secret is not set in development, provide helpful diagnostic
  if (!secret) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Turnstile Warning] TURNSTILE_SECRET is not set in environment. Skipping verification in non-production."
      );
      return { success: true, hostname: "localhost", action: expectedAction };
    }
    return { success: false, error: "Turnstile secret is not configured on the server." };
  }

  // Canonical hostname list (production and local test domains)
  const defaultHostnames = "www.apexhaveninvestments.com,apexhaveninvestments.com,localhost,127.0.0.1";
  const expectedHostnames = new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? defaultHostnames)
      .split(",")
      .map((hostname) => hostname.trim())
      .filter(Boolean)
  );

  // Validate token shape
  if (
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > 2048 ||
    expectedHostnames.size === 0
  ) {
    return { success: false, error: "Invalid Turnstile response token format." };
  }

  try {
    const params = new URLSearchParams({
      secret,
      response: token,
    });
    if (clientIp) {
      params.append("remoteip", clientIp);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body: params,
    });

    if (!res.ok) {
      return { success: false, error: `Cloudflare siteverify returned HTTP ${res.status}` };
    }

    const outcome = (await res.json()) as {
      success: boolean;
      action?: string;
      hostname?: string;
      "error-codes"?: string[];
    };

    if (!outcome.success) {
      return {
        success: false,
        error: "Turnstile challenge validation failed.",
        errorCodes: outcome["error-codes"],
      };
    }

    if (expectedAction && outcome.action && outcome.action !== expectedAction) {
      return {
        success: false,
        error: `Action mismatch: expected "${expectedAction}", got "${outcome.action}".`,
      };
    }

    if (outcome.hostname && !expectedHostnames.has(outcome.hostname)) {
      return {
        success: false,
        error: `Hostname mismatch: "${outcome.hostname}" is not in approved list.`,
      };
    }

    return {
      success: true,
      hostname: outcome.hostname || "",
      action: outcome.action || expectedAction,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Network error during verification";
    return { success: false, error: `Turnstile verification failed: ${message}` };
  }
}
