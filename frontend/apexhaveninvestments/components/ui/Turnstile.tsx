"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";

export interface TurnstileRef {
  reset: () => void;
}

interface TurnstileProps {
  action?: string;
  onSuccess: (token: string) => void;
  onError?: (error?: unknown) => void;
  onExpire?: () => void;
  className?: string;
  theme?: "light" | "dark" | "auto";
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        params: {
          sitekey: string;
          action?: string;
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "error-callback"?: (error: unknown) => void;
          "expired-callback"?: () => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

// Official Live Site Key for Apex Haven Investments
const TURNSTILE_SITEKEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAFXmbeXF3wuqTtNE";

export const Turnstile = forwardRef<TurnstileRef, TurnstileProps>(function Turnstile(
  { action = "contact", onSuccess, onError, onExpire, className = "", theme = "light" },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [domainMismatch, setDomainMismatch] = useState(false);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (typeof window !== "undefined" && window.turnstile && widgetIdRef.current) {
        try {
          window.turnstile.reset(widgetIdRef.current);
        } catch {
          // ignore
        }
      }
    },
  }));

  useEffect(() => {
    let isMounted = true;

    function renderWidget() {
      if (!isMounted || !containerRef.current || !window.turnstile) return;

      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
        widgetIdRef.current = null;
      }

      try {
        const id = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITEKEY,
          action,
          theme,
          callback: (token: string) => {
            if (isMounted) onSuccess(token);
          },
          "error-callback": (err: unknown) => {
            // Error code 110200 indicates the current domain (e.g. localhost) is not registered in Cloudflare
            const errStr = String(err ?? "");
            if (errStr.includes("110200")) {
              if (isMounted) setDomainMismatch(true);
            }
            if (isMounted && onError) onError(err);
          },
          "expired-callback": () => {
            if (isMounted && onExpire) onExpire();
          },
        });
        widgetIdRef.current = id;
      } catch (err) {
        console.error("Failed to render Cloudflare Turnstile:", err);
      }
    }

    const scriptId = "cf-turnstile-script";
    if (typeof window !== "undefined") {
      if (window.turnstile) {
        renderWidget();
      } else {
        window.onloadTurnstileCallback = () => {
          renderWidget();
        };

        if (!document.getElementById(scriptId)) {
          const script = document.createElement("script");
          script.id = scriptId;
          script.src =
            "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback&render=explicit";
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
        }
      }
    }

    return () => {
      isMounted = false;
      if (widgetIdRef.current && typeof window !== "undefined" && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
        widgetIdRef.current = null;
      }
    };
  }, [action, theme, onSuccess, onError, onExpire]);

  return (
    <div className={`my-3 min-h-[65px] ${className}`}>
      <div ref={containerRef} className="cf-turnstile" />
      {domainMismatch && (
        <div className="mt-2 rounded-xl bg-amber-50 p-2.5 text-xs text-amber-800 border border-amber-200">
          ⚠️ <strong>Domain notice (Cloudflare Turnstile):</strong> The current hostname (<code>{typeof window !== "undefined" ? window.location.hostname : "localhost"}</code>) is not listed in the widget's allowed domains in your Cloudflare Dashboard. Please add <code>localhost</code> under <strong>Turnstile &gt; Settings &gt; Domains</strong> in your Cloudflare Dashboard.
        </div>
      )}
    </div>
  );
});

export default Turnstile;
