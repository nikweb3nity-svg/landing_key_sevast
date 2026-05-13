"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";

const COOKIE_CONSENT_KEY = "zamok-expert-cookie-consent";

export function CookieConsent() {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted") {
        return;
      }
    } catch {
      // If storage is unavailable, still show the notice and let the user dismiss it for this session.
    }

    setShouldRender(true);
    const frame = window.requestAnimationFrame(() => setIsVisible(true));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function acceptCookies() {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    } catch {
      // Consent is still respected for the current session if storage is unavailable.
    }

    setIsVisible(false);
    window.setTimeout(() => setShouldRender(false), 260);
  }

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`fixed inset-x-0 bottom-24 z-[60] px-4 transition-all duration-300 ease-out lg:bottom-5 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      role="region"
      aria-label="Уведомление об использовании cookie"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-3xl border border-civic-200/20 bg-graphite-950/88 p-4 shadow-[0_0_34px_rgba(37,99,235,0.18)] backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-2xl border border-civic-200/25 bg-civic-500/12 text-civic-100">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="text-sm leading-6 text-slate-200 sm:text-base">
            Мы используем cookie и сервисы аналитики для улучшения работы сайта.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 min-[420px]:flex-row">
          <Link
            href="/privacy"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-civic-200/25 bg-white/7 px-4 text-sm font-bold text-civic-50 transition hover:border-civic-100/50 hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-civic-200"
          >
            Политика конфиденциальности
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-civic-100/60 bg-civic-500 px-5 text-sm font-bold text-white shadow-[0_0_24px_rgba(37,99,235,0.42)] transition hover:bg-civic-400 focus:outline-none focus:ring-2 focus:ring-civic-200"
            onClick={acceptCookies}
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
