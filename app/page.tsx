"use client";

import { motion } from "framer-motion";
import { type FormEvent, useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Car,
  CheckCircle2,
  Clock3,
  DoorOpen,
  KeyRound,
  LockKeyhole,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NavHeader from "@/components/nav-header";
import { TiltCard } from "@/components/tilt-card";
import { NeonButton, NeonButtonLink } from "@/components/ui/neon-button";
import { ShimmerText } from "@/components/ui/shimmer-text";
import { landingContent } from "@/data/landing";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const serviceIcons = [DoorOpen, Car, LockKeyhole, KeyRound, BadgeCheck, Wrench, ShieldCheck];

type LeadFormStatus = "idle" | "loading" | "success" | "error";

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <motion.div
      className="mx-auto mb-10 max-w-3xl text-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={fadeUp}
      transition={{ duration: 0.55 }}
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-civic-300/20 bg-civic-500/10 px-4 py-2 text-sm font-semibold text-civic-200">
        <ShieldCheck className="h-4 w-4" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{text}</p> : null}
    </motion.div>
  );
}

function CtaButtons({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex ${compact ? "flex-col" : "flex-col sm:flex-row"} gap-3`}>
      <NeonButtonLink
        href={landingContent.phoneHref}
        variant="call"
        size="md"
      >
        <Phone className="h-5 w-5" />
        Позвонить сейчас
      </NeonButtonLink>
      <NeonButtonLink
        href={landingContent.telegramHref}
        variant="glass"
        size="md"
      >
        <MessageCircle className="h-5 w-5" />
        Написать в Telegram
      </NeonButtonLink>
    </div>
  );
}

function LeadForm() {
  const [status, setStatus] = useState<LeadFormStatus>("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    comment: "",
    consent: false,
  });

  useEffect(() => {
    function handleServiceSelect(event: Event) {
      const serviceTitle = (event as CustomEvent<string>).detail;

      if (!serviceTitle) {
        return;
      }

      setStatus("idle");
      setMessage(`Выбрана услуга: ${serviceTitle}. Оставьте телефон, и мастер свяжется с вами.`);
      setForm((current) => {
        const serviceLine = `Услуга: ${serviceTitle}`;
        const comment = current.comment.trim();

        return {
          ...current,
          comment: comment && !comment.includes(serviceLine) ? `${serviceLine}\n${comment}` : serviceLine,
        };
      });

      window.setTimeout(() => document.getElementById("lead-phone")?.focus(), 450);
    }

    window.addEventListener("lead-service-select", handleServiceSelect);

    return () => window.removeEventListener("lead-service-select", handleServiceSelect);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Не удалось отправить заявку.");
      }

      setStatus("success");
      setMessage("Заявка отправлена. Мастер скоро свяжется с вами.");
      setForm({ name: "", phone: "", comment: "", consent: false });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Не удалось отправить заявку.");
    }
  }

  const isLoading = status === "loading";

  return (
    <form id="lead-form" className="space-y-4 scroll-mt-28" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-sm font-semibold text-civic-100" htmlFor="lead-name">
          Имя
        </label>
        <input
          id="lead-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          className="min-h-12 w-full rounded-xl border border-white/12 bg-graphite-950/70 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-civic-300 focus:ring-2 focus:ring-civic-500/30"
          placeholder="Как к вам обращаться"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-civic-100" htmlFor="lead-phone">
          Телефон
        </label>
        <input
          id="lead-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          value={form.phone}
          onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
          className="min-h-12 w-full rounded-xl border border-white/12 bg-graphite-950/70 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-civic-300 focus:ring-2 focus:ring-civic-500/30"
          placeholder="+7 (___) ___-__-__"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-civic-100" htmlFor="lead-comment">
          Комментарий
        </label>
        <textarea
          id="lead-comment"
          name="comment"
          rows={4}
          value={form.comment}
          onChange={(event) => setForm((current) => ({ ...current, comment: event.target.value }))}
          className="w-full resize-none rounded-xl border border-white/12 bg-graphite-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-civic-300 focus:ring-2 focus:ring-civic-500/30"
          placeholder="Что случилось и куда приехать"
        />
      </div>
      <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-graphite-950/48 p-4 text-xs leading-5 text-slate-300">
        <input
          name="consent"
          type="checkbox"
          required
          checked={form.consent}
          onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))}
          className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-graphite-950 text-civic-500 accent-civic-500"
        />
        <span>
          я даю согласие на обработку персональных данных в соответствии с{" "}
          <Link className="font-semibold text-civic-200 underline-offset-4 hover:underline" href="/privacy">
            политикой конфиденциальности
          </Link>
        </span>
      </label>
      <NeonButton
        type="submit"
        disabled={isLoading}
        full
        variant="solid"
        size="md"
      >
        {isLoading ? "Отправляем..." : "Отправить заявку"}
        {!isLoading ? <ArrowRight className="h-5 w-5" /> : null}
      </NeonButton>
      {message ? (
        <p
          className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
            status === "success"
              ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-100"
              : "border-red-300/25 bg-red-400/10 text-red-100"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

export default function Home() {
  function handleServiceLead(serviceTitle: string) {
    window.dispatchEvent(new CustomEvent("lead-service-select", { detail: serviceTitle }));
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <main className="min-h-screen overflow-hidden bg-graphite-950 text-slate-100">
      <div className="blue-grid pointer-events-none fixed inset-0 opacity-70" />

      <NavHeader />

      <section id="hero" className="relative px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.65 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-civic-300/20 bg-civic-500/10 px-4 py-2 text-sm font-bold text-civic-100">
              <Clock3 className="h-4 w-4" />
              Аварийный выезд в день обращения
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
              <ShimmerText duration={3.2} delay={0.45}>
                Вскрытие замков в Севастополе без лишнего шума и повреждений
              </ShimmerText>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              <ShimmerText className="text-slate-300 [--shimmer-contrast:rgba(191,219,254,0.9)]" duration={4.2} delay={1.1}>
                {landingContent.brand} помогает срочно открыть дверь, автомобиль, сейф или гараж.
                Мастер приезжает с профессиональным инструментом, называет цену до начала работ и
                действует аккуратно.
              </ShimmerText>
            </p>
            <div className="mt-8">
              <CtaButtons />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {landingContent.badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/7 px-4 py-2 text-sm font-semibold text-slate-200 backdrop-blur"
                >
                  <CheckCircle2 className="h-4 w-4 text-civic-300" />
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            <div className="absolute -inset-8 rounded-full bg-civic-500/20 blur-3xl" />
            <div className="glass-line relative overflow-hidden rounded-[2rem]">
              <Image
                src={landingContent.heroImage}
                alt="Мастер аккуратно открывает дверной замок"
                width={900}
                height={620}
                priority
                className="h-[420px] w-full object-cover md:h-[560px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/20 to-transparent" />
              <a
                href={landingContent.phoneHref}
                aria-label={`Позвонить ${landingContent.phone}`}
                className="group absolute bottom-5 left-5 right-5 rounded-2xl border border-white/12 bg-graphite-950/72 p-5 backdrop-blur-xl transition hover:border-civic-200/45 hover:bg-civic-950/82 focus:outline-none focus:ring-2 focus:ring-civic-300"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-civic-200">Срочный вызов мастера</p>
                    <p className="mt-1 whitespace-nowrap text-[clamp(1.18rem,5.9vw,1.5rem)] font-bold text-white">
                      {landingContent.phone}
                    </p>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-civic-500 transition group-hover:bg-civic-400">
                    <Phone className="h-6 w-6" />
                  </div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl gap-4 md:grid-cols-3">
          {landingContent.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative z-10"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <TiltCard className="glass-line min-h-28 rounded-2xl p-6" tiltLimit={10} scale={1.03}>
                <div className="text-3xl font-bold text-civic-100 md:text-4xl">{stat.value}</div>
                <div className="mt-2 text-sm font-semibold text-slate-300 md:text-base">{stat.label}</div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="services" className="relative px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Услуги"
            title="Открываем сложные замки аккуратно и официально"
            text="Каждая заявка начинается с диагностики: тип механизма, риск повреждений, доступные способы открытия и понятная стоимость."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {landingContent.services.map((service, index) => {
              const Icon = serviceIcons[index] ?? KeyRound;
              return (
                <motion.article
                  key={service.title}
                  role="button"
                  tabIndex={0}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/7 transition hover:border-civic-300/35 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-civic-300"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.22 }}
                  variants={fadeUp}
                  transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
                  onClick={() => handleServiceLead(service.title)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleServiceLead(service.title);
                    }
                  }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={720}
                      height={420}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-xl bg-civic-500 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    <p className="mt-3 leading-7 text-slate-300">{service.text}</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <NeonButton
                        type="button"
                        variant="solid"
                        size="sm"
                        full
                        onClick={(event) => {
                          event.stopPropagation();
                          handleServiceLead(service.title);
                        }}
                      >
                        Оставить заявку
                        <ArrowRight className="h-4 w-4" />
                      </NeonButton>
                      <NeonButtonLink
                        href={landingContent.phoneHref}
                        variant="call"
                        size="sm"
                        full
                        onClick={(event) => event.stopPropagation()}
                      >
                        <Phone className="h-4 w-4" />
                        Позвонить
                      </NeonButtonLink>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="prices" className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Цены"
            title="Ориентиры до выезда, финальная цена до начала работ"
            text="Стоимость зависит от типа замка, доступа к механизму и срочности. Мастер согласует цену заранее."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {landingContent.prices.map((price, index) => (
              <motion.div
                key={price.title}
                className="glass-line rounded-2xl p-6"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <p className="text-sm font-bold uppercase text-civic-200">Услуга</p>
                <h3 className="mt-4 min-h-14 text-xl font-bold text-white">{price.title}</h3>
                <p className="mt-4 text-3xl font-bold text-civic-200">{price.value}</p>
                <p className="mt-4 leading-6 text-slate-300">{price.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionTitle
              eyebrow="Почему выбирают нас"
              title="Сервис с ощущением порядка, а не случайной бригады"
              text="В экстренной ситуации важны спокойствие, прозрачность и аккуратная работа."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {landingContent.reasons.map((reason, index) => (
              <motion.div
                key={reason}
                className="glass-line rounded-2xl p-5"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.45, delay: (index % 2) * 0.06 }}
              >
                <CheckCircle2 className="mb-4 h-6 w-6 text-civic-300" />
                <p className="font-semibold leading-7 text-white">{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Как проходит работа"
            title="Четкий порядок от заявки до открытого замка"
          />
          <div className="grid gap-4 md:grid-cols-4">
            {landingContent.steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative rounded-2xl border border-white/10 bg-white/7 p-6"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <span className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-civic-500 font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Отзывы" title="Клиенты ценят скорость и спокойный подход" />
          <div className="grid gap-4 md:grid-cols-3">
            {landingContent.reviews.map((review, index) => (
              <motion.figure
                key={review.name}
                className="glass-line rounded-2xl p-6"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="mb-5 flex gap-1 text-civic-300">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="leading-7 text-slate-200">«{review.text}»</blockquote>
                <figcaption className="mt-5 font-bold text-white">{review.name}</figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionTitle eyebrow="FAQ" title="Частые вопросы перед вызовом" />
          <div className="space-y-4">
            {landingContent.faq.map((item, index) => (
              <motion.details
                key={item.question}
                className="glass-line group rounded-2xl p-6"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-white">
                  {item.question}
                  <ArrowRight className="h-5 w-5 shrink-0 text-civic-300 transition group-open:rotate-90" />
                </summary>
                <p className="mt-4 leading-7 text-slate-300">{item.answer}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="px-5 py-20 md:px-8 md:pb-28">
        <motion.div
          className="glass-line mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[2rem] p-6 md:p-10 lg:grid-cols-[1fr_0.8fr]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          transition={{ duration: 0.55 }}
        >
          <div>
            <p className="text-sm font-bold uppercase text-civic-200">Контакты</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">
              Нужен мастер сейчас? Свяжитесь удобным способом
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Расскажите, что случилось: дверь, авто, сейф или гараж. По возможности отправьте
              фото замка в Telegram, так оценка будет точнее.
            </p>
            <div className="mt-8">
              <CtaButtons />
            </div>
          </div>
          <div className="rounded-2xl border border-civic-300/20 bg-civic-500/10 p-6">
            <h3 className="mb-5 text-2xl font-bold text-white">Оставить заявку</h3>
            <LeadForm />
            <div className="mb-6 mt-8 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-civic-500">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-civic-200">Телефон</p>
                <a className="text-2xl font-bold text-white" href={landingContent.phoneHref}>
                  {landingContent.phone}
                </a>
              </div>
            </div>
            <div className="mb-6 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-civic-500">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-civic-200">Telegram</p>
                <a className="text-2xl font-bold text-white" href={landingContent.telegramHref}>
                  {landingContent.telegram}
                </a>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-graphite-950/58 p-4 leading-7 text-slate-300">
              Выезд по Севастополю и ближайшим районам. Документы на доступ проверяются перед
              началом работ.
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-sm text-slate-400 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-slate-200">{landingContent.brand}</p>
            <p className="mt-1">Служба аварийного вскрытия замков в Севастополе</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link className="transition hover:text-white" href="/privacy">
              Политика конфиденциальности
            </Link>
            <a className="transition hover:text-white" href={landingContent.phoneHref}>
              {landingContent.phone}
            </a>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-5 right-5 z-50 hidden lg:block">
        <NeonButtonLink
          href={landingContent.phoneHref}
          variant="call"
          size="lg"
        >
          <Phone className="h-5 w-5" />
          Срочный вызов
        </NeonButtonLink>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-graphite-950/90 p-3 backdrop-blur-xl lg:hidden">
        <NeonButtonLink
          href={landingContent.phoneHref}
          variant="call"
          size="lg"
          full
        >
          <Phone className="h-5 w-5 shrink-0" />
          <span className="min-w-0 whitespace-nowrap text-[clamp(0.86rem,4.25vw,1rem)]">
            Позвонить: {landingContent.phone}
          </span>
        </NeonButtonLink>
      </div>
    </main>
  );
}
