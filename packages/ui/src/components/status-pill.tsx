//packages/ui/components/status-pill.tsx

import { cn } from "../lib/cn";

type StatusPillTone = "cyan" | "pink" | "green" | "purple" | "neutral";

type StatusPillProps = {
  label: string;
  tone?: StatusPillTone;
  className?: string;
};

const toneClasses: Record<StatusPillTone, string> = {
  cyan: "border-cyan-400/40 bg-cyan-400/10 text-cyan-300",
  pink: "border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-300",
  green: "border-lime-400/40 bg-lime-400/10 text-lime-300",
  purple: "border-violet-400/40 bg-violet-400/10 text-violet-300",
  neutral: "border-white/15 bg-white/5 text-white/70"
};

export function StatusPill({
  label,
  tone = "neutral",
  className
}: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em]",
        toneClasses[tone],
        className
      )}
    >
      {label}
    </span>
  );
}
