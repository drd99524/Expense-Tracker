import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site-config";

type SiteFrameProps = {
  children: ReactNode;
};

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

type ContentSectionProps = {
  id?: string;
  title: string;
  children: ReactNode;
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function SiteFrame({ children }: SiteFrameProps) {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#030303] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-28 h-80 w-80 rounded-full bg-[#39FF14]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-white/8 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="inline-flex min-w-0 items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/35 bg-cyan-400/10 text-sm font-semibold text-cyan-300">
              ET
            </span>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                Public Site
              </p>
              <p className="truncate text-base font-semibold text-white">
                {siteConfig.productName}
              </p>
            </div>
          </Link>

          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
            <nav className="flex flex-wrap items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/75 transition-colors duration-200 hover:border-cyan-400/35 hover:text-cyan-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/login"
                className="rounded-full border border-white/10 bg-black/45 px-4 py-2 text-sm text-white/70 transition-colors duration-200 hover:border-cyan-400/35 hover:text-cyan-200"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="rounded-full border border-cyan-400/35 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition-colors duration-200 hover:bg-cyan-400/15"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">{children}</main>

      <footer className="relative z-10 border-t border-white/8 bg-black/55">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
              {siteConfig.productName}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">
              {siteConfig.summary}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Public pages</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-white/65">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Access</p>
            <div className="mt-3 space-y-2 text-sm text-white/65">
              <Link href="/login">Sign In</Link>
              <Link href="/signup">Create Account</Link>
              <p>{siteConfig.supportEmail}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-6 pt-10 md:pt-14">
      <div className="overflow-hidden rounded-[34px] border border-white/10 bg-black/55 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8">
        <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-300/75">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65 md:text-base">
          {description}
        </p>
      </div>
    </section>
  );
}

export function ContentSection({ id, title, children }: ContentSectionProps) {
  return (
    <section
      id={id}
      className="overflow-hidden rounded-[30px] border border-white/10 bg-black/45 p-6 shadow-[0_24px_64px_rgba(0,0,0,0.35)] backdrop-blur-xl"
    >
      <h2 className="text-xl font-semibold text-white md:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-white/68 md:text-[15px]">
        {children}
      </div>
    </section>
  );
}
