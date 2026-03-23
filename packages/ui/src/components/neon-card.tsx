//packages/ui/components/neon-card.tsx

import type { ReactNode } from "react";
import { cn } from "../lib/cn";

type NeonCardProps = {
  children: ReactNode;
  className?: string;
};

export function NeonCard({ children, className }: NeonCardProps) {
  return (
    <section
      className={cn(
        "rounded-[28px] border border-white/10 bg-white/5 p-5 text-white shadow-[0_0_30px_rgba(0,245,255,0.08)]",
        className
      )}
    >
      {children}
    </section>
  );
}
