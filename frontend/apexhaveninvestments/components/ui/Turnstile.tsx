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

const PRODUCTION_SITEKEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAFXmbeXF3wuqTtNE";
// Cloudflare official test key that always passes on localhost/unregistered domains
const TEST_SITEKEY = "1x00000000000000000000AA";

export const Turnstile = forwardRef<TurnstileRef, TurnstileProps>(function Turnstile(
  { action = "contact", onSuccess, onError, onExpire, className = "", theme = "light" },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [currentKey, setCurrentKey] = useState<string>(() => {
    // If running in browser on localhost or 127.0.0.1, check
    if (typeof window !== "undefined") {
      const isLocal =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";
      // Allow user to use production key or fallback
      return isLocal && process.env.NODE_ENV === "development"
        ? PRODUCTION_SITEKEY
        : PRODUCTION_SITEKEY;
    }
    return PRODUCTION_SITEKEY;
  });

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

      // Clean up any existing widget in this container
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
          sitekey: currentKey,
          action,
          theme,
          callback: (token: string) => {
            if (isMounted) onSuccess(token);
          },
          "error-callback": (err: unknown) => {
            // Error 110200 is domain mismatch (e.g. localhost not added to Cloudflare widget yet)
            const isLocal =
              typeof window !== "undefined" &&
              (window.location.hostname === "localhost" ||
                window.location.hostname === "127.0.0.1");

            if (isLocal && currentKey !== TEST_SITEKEY) {
              console.warn(
                "[Cloudflare Turnstile] Domain mismatch on localhost (Error 110200). " +
                  "Switching to Cloudflare test sitekey for local development. " +
                  "To use production key locally, add 'localhost' to your widget domains in Cloudflare Dashboard."
              );
              if (isMounted) {
                setCurrentKey(TEST_SITEKEY);
              }
              return;
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

    // Load Turnstile script if not already loaded
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
  }, [action, theme, currentKey, onSuccess, onError, onExpire]);

  return (
    <div className={`my-3 min-h-[65px] ${className}`}>
      <div ref={containerRef} className="cf-turnstile" />
    </div>
  );
});

export default Turnstile;
