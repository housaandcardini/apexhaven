"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

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

const TURNSTILE_SITEKEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAFXmbeXF3wuqTtNE";

export const Turnstile = forwardRef<TurnstileRef, TurnstileProps>(function Turnstile(
  { action = "contact", onSuccess, onError, onExpire, className = "", theme = "light" },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (typeof window !== "undefined" && window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
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
          sitekey: TURNSTILE_SITEKEY,
          action,
          theme,
          callback: (token: string) => {
            if (isMounted) onSuccess(token);
          },
          "error-callback": (err: unknown) => {
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
  }, [action, theme, onSuccess, onError, onExpire]);

  return (
    <div className={`my-3 min-h-[65px] ${className}`}>
      <div ref={containerRef} className="cf-turnstile" />
    </div>
  );
});

export default Turnstile;
