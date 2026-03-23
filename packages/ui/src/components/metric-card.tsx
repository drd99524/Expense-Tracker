//packages/ui/components/metric-card.tsx

import { NeonCard } from "./neon-card";
import { cn } from "../lib/cn";

type MetricTone = "cyan" | "pink" | "green" | "purple";

type MetricCardProps = {
  label: string;
  value: string;
  hint?: string;
  tone?: MetricTone;
  className?: string;
};

const toneClasses: Record<MetricTone, string> = {
  cyan: "shadow-[0_0_24px_rgba(0,245,255,0.12)]",
  pink: "shadow-[0_0_24px_rgba(255,43,214,0.12)]",
  green: "shadow-[0_0_24px_rgba(57,255,20,0.12)]",
  purple: "shadow-[0_0_24px_rgba(157,77,255,0.12)]"
};

export function MetricCard({
  label,
  value,
  hint,
  tone = "cyan",
  className
}: MetricCardProps) {
  return (
    <NeonCard className={cn("rounded-[24px] p-4", toneClasses[tone], className)}>
      <p className="text-xs uppercase tracking-[0.18em] text-white/45">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
      {hint ? <p className="mt-2 text-xs text-white/60">{hint}</p> : null}
    </NeonCard>
  );
}
