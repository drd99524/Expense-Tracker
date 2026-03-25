import type { Metadata } from "next";
import Link from "next/link";
import { ContentSection, SiteFrame } from "@/components/public/site-frame";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.productName,
  description:
    "Expense Tracker is a secure personal budgeting app with private accounts, persistent expense history, and a clean neon dashboard built for everyday spending decisions.",
};

function DashboardPreview() {
  return (
    <section className="overflow-hidden rounded-[34px] border border-cyan-400/20 bg-[#020202] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.4)] md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
            Product Preview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            A dashboard built for fast, private budgeting
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
            The app keeps your planning and your spending history in one place:
            rolling budgets, logged expenses, and a timeline that stays usable
            on both mobile and desktop.
          </p>
        </div>
        <span className="rounded-full border border-[#39FF14]/35 bg-[#39FF14]/10 px-3 py-1 text-xs font-medium text-[#39FF14]">
          Account-Based
        </span>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="min-w-0 rounded-[26px] border border-white/8 bg-white/[0.03] p-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                Spending rhythm
              </p>
              <p className="mt-2 text-3xl font-semibold text-white md:text-4xl">
                Weekly to yearly visibility
              </p>
            </div>
            <p className="text-sm text-cyan-300">Trend view</p>
          </div>

          <div className="mt-5 h-48 rounded-[22px] border border-white/8 bg-black/55 p-3 md:h-56">
            <svg viewBox="0 0 360 160" className="h-full w-full">
              <defs>
                <linearGradient id="previewLine" x1="0" x2="1">
                  <stop offset="0%" stopColor="#b4ff9f" />
                  <stop offset="100%" stopColor="#39FF14" />
                </linearGradient>
                <linearGradient id="previewFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(57,255,20,0.28)" />
                  <stop offset="100%" stopColor="rgba(57,255,20,0)" />
                </linearGradient>
              </defs>
              <path
                d="M10 110 L40 104 L70 92 L100 96 L130 70 L160 76 L190 58 L220 64 L250 48 L280 54 L310 36 L340 28 L340 150 L10 150 Z"
                fill="url(#previewFill)"
              />
              <path
                d="M10 110 L40 104 L70 92 L100 96 L130 70 L160 76 L190 58 L220 64 L250 48 L280 54 L310 36 L340 28"
                stroke="url(#previewLine)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["7 days", "Short-window budget checks"],
              ["Month", "Main spending pace"],
              ["Year", "Long-view planning"],
            ].map(([label, body]) => (
              <div
                key={label}
                className="rounded-[22px] border border-white/8 bg-black/40 p-3"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-white/35">
                  {label}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/68">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="min-w-0 rounded-[26px] border border-white/8 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/35">
              Category balance
            </p>
            <div className="mt-4 space-y-3">
              {[
                ["Groceries", "Recurring essentials", "bg-[#39FF14]/18", "w-[86%]"],
                ["Food", "Flexible day-to-day spend", "bg-cyan-400/16", "w-[64%]"],
                ["Transport", "Trips and fuel", "bg-amber-400/14", "w-[48%]"],
                ["Bills", "Fixed monthly costs", "bg-red-400/14", "w-[42%]"],
              ].map(([label, value, bgClass, widthClass]) => (
                <div key={label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/72">{label}</span>
                    <span className="text-white/45">{value}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/6">
                    <div
                      className={`h-2 rounded-full ${bgClass} ${widthClass}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 rounded-[26px] border border-white/8 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/35">
              Core workflow
            </p>
            <div className="mt-4 grid gap-3">
              {[
                ["Create your account", "Use an email address and password to keep your data tied to one account."],
                ["Set budgets", "Define short, monthly, and long-range spending targets."],
                ["Log and review", "Capture expenses quickly and revisit clean history views later."],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-[22px] border border-white/8 bg-black/40 p-3"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-white/35">
                    {label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/68">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <SiteFrame>
      <section className="mx-auto w-full max-w-6xl px-4 pb-8 pt-10 md:pb-12 md:pt-14">
        <div className="grid gap-6 xl:grid-cols-[1.03fr_0.97fr]">
          <section className="overflow-hidden rounded-[34px] border border-white/10 bg-black/55 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
              Personal Budgeting
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight text-white md:text-6xl">
              Keep your spending decisions clear without carrying a spreadsheet
              everywhere.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/68">
              {siteConfig.productName} gives each user a private account for
              budgets, expense entries, and long-lived history. It is built for
              everyday tracking: set your limits, log what happened, and review
              the pattern before the month gets away from you.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="rounded-full border border-cyan-400/35 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-200"
              >
                Create Account
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/75"
              >
                Sign In
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-white/10 bg-black/45 px-5 py-3 text-sm font-medium text-white/60"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "Private accounts",
                  body: "Each account is tied to an email address, with budgets and expenses isolated to that signed-in user.",
                },
                {
                  title: "Persistent data",
                  body: "Budgets and transactions are stored in Supabase so your records survive deployments and device changes.",
                },
                {
                  title: "Fast logging",
                  body: "The app focuses on a clean flow for adding expenses and checking totals without burying the main tasks.",
                },
                {
                  title: "Readable history",
                  body: "A dedicated history view keeps recent entries, categories, and trends easy to review later.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="min-w-0 rounded-[24px] border border-white/8 bg-white/[0.03] p-4"
                >
                  <h3 className="text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

          </section>

          <DashboardPreview />
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-16">
        <div className="grid gap-6 lg:grid-cols-3">
          <ContentSection title="Built for the actual job">
            <p>
              Expense Tracker focuses on the routine work of personal budgeting:
              opening the app quickly, checking where your spending stands, and
              logging a transaction before you forget it.
            </p>
            <p>
              The experience stays intentionally narrow so the core actions are
              always close: set limits, add expenses, and review history.
            </p>
          </ContentSection>

          <ContentSection title="How data stays organized">
            <p>
              Budgets are managed across multiple windows, and expenses are
              stored against the authenticated user account. That structure
              makes it straightforward to keep separate histories per person and
              bring the same account back on another device later.
            </p>
          </ContentSection>

          <ContentSection title="Transparency pages">
            <p>
              The public site includes clear pages for product context, privacy,
              and terms:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <Link href="/about" className="text-cyan-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-cyan-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-cyan-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </ContentSection>
        </div>

        <section className="overflow-hidden rounded-[34px] border border-white/10 bg-black/55 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                Start with an account, then keep the routine lightweight
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/65">
                The app is aimed at a simple cycle that is easy to repeat:
                create an account, define your budgets, log expenses when they
                happen, and revisit the dashboard when you need a clearer read
                on where the month is going.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Create a private account",
                  body: "Register with an email address and password so your budgets and expense history stay attached to one identity.",
                },
                {
                  step: "02",
                  title: "Set your budget windows",
                  body: "Track short bursts of spending alongside monthly and annual targets instead of forcing everything into one number.",
                },
                {
                  step: "03",
                  title: "Review the pattern",
                  body: "Use the dashboard and history views to see which categories are stable and which ones need attention.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-[26px] border border-white/8 bg-white/[0.03] p-4"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/75">
                    {item.step}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
