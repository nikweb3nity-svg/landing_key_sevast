"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { KeyRound, Menu, Phone, X } from "lucide-react";
import { landingContent } from "@/data/landing";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Услуги", href: "#services" },
  { label: "Цены", href: "#prices" },
  { label: "Как работаем", href: "#process" },
  { label: "Контакты", href: "#contacts" },
];

function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-graphite-950/78 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <a href="#hero" className="flex min-w-fit items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-civic-500 text-white shadow-glow">
            <KeyRound className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-display text-lg font-semibold text-white">{landingContent.brand}</span>
            <span className="block text-xs font-semibold uppercase text-civic-200">Севастополь 24/7</span>
          </span>
        </a>

        <nav className="hidden lg:block" aria-label="Основная навигация">
          <ul
            className="relative mx-auto flex w-fit rounded-full border border-civic-200/20 bg-white/8 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
            onMouseLeave={() => setPosition((current) => ({ ...current, opacity: 0 }))}
          >
            {navItems.map((item) => (
              <Tab key={item.href} href={item.href} setPosition={setPosition}>
                {item.label}
              </Tab>
            ))}
            <Cursor position={position} />
          </ul>
        </nav>

        <div className="hidden min-w-fit items-center gap-3 md:flex">
          <a
            href={landingContent.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-civic-300/25 bg-civic-500/12 px-4 py-2 text-sm font-bold text-civic-100 transition hover:bg-civic-500/20"
          >
            <Phone className="h-4 w-4" />
            {landingContent.phone}
          </a>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/8 text-white md:hidden"
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <motion.nav
          className="mx-5 mb-4 rounded-2xl border border-civic-200/20 bg-graphite-900/96 p-3 shadow-soft-blue backdrop-blur-xl md:hidden"
          aria-label="Мобильная навигация"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="grid gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-civic-500/16"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={landingContent.phoneHref}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-civic-500 px-4 py-3 text-sm font-bold text-white"
              onClick={() => setMobileOpen(false)}
            >
              <Phone className="h-4 w-4" />
              {landingContent.phone}
            </a>
          </div>
        </motion.nav>
      ) : null}
    </header>
  );
}

const Tab = ({
  children,
  href,
  setPosition,
}: {
  children: React.ReactNode;
  href: string;
  setPosition: React.Dispatch<React.SetStateAction<{ left: number; width: number; opacity: number }>>;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <a
      ref={ref}
      href={href}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer rounded-full px-4 py-2 text-sm font-bold text-slate-200 mix-blend-difference transition md:px-5"
    >
      {children}
    </a>
  );
};

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
  return (
    <motion.span
      animate={position}
      className={cn("absolute z-0 h-9 rounded-full bg-white shadow-[0_0_36px_rgba(147,197,253,0.24)]")}
      transition={{ type: "spring", stiffness: 360, damping: 32 }}
    />
  );
};

export default NavHeader;
