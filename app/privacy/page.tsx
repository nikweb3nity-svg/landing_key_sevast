import type { Metadata } from "next";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { landingContent } from "@/data/landing";
import { privacyPolicy } from "@/data/legal";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | Замок Эксперт",
  description:
    "Политика конфиденциальности и обработки персональных данных сайта службы «Замок Эксперт».",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-graphite-950 px-5 py-10 text-slate-100 md:px-8">
      <div className="blue-grid pointer-events-none fixed inset-0 opacity-70" />
      <div className="relative mx-auto max-w-4xl">
        <Link className="mb-10 inline-flex items-center gap-3" href="/">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-civic-500 text-white shadow-glow">
            <KeyRound className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-display text-lg font-semibold text-white">{landingContent.brand}</span>
            <span className="block text-xs font-semibold uppercase text-civic-200">Вернуться на сайт</span>
          </span>
        </Link>

        <article className="glass-line rounded-[2rem] p-6 md:p-10">
          <p className="text-sm font-bold uppercase text-civic-200">Обработка персональных данных</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-6xl">
            {privacyPolicy.title}
          </h1>
          <p className="mt-4 text-sm text-slate-400">Дата обновления: {privacyPolicy.updatedAt}</p>

          <section className="mt-8 rounded-2xl border border-civic-300/20 bg-civic-500/10 p-5">
            <h2 className="text-xl font-bold text-white">Оператор персональных данных</h2>
            <dl className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-civic-100">Наименование</dt>
                <dd>{privacyPolicy.operator.name}</dd>
              </div>
              <div>
                <dt className="font-semibold text-civic-100">Сайт</dt>
                <dd>{privacyPolicy.operator.site}</dd>
              </div>
              <div>
                <dt className="font-semibold text-civic-100">Телефон</dt>
                <dd>{privacyPolicy.operator.phone}</dd>
              </div>
              <div>
                <dt className="font-semibold text-civic-100">Telegram</dt>
                <dd>{privacyPolicy.operator.telegram}</dd>
              </div>
            </dl>
          </section>

          <div className="mt-8 space-y-8">
            {privacyPolicy.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                <div className="mt-4 space-y-3 leading-7 text-slate-300">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
