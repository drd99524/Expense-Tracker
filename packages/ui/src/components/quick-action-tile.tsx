//packages/ui/components/quick-action-tile.tsx

import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type QuickActionTone = "cyan" | "pink" | "green" | "purple";

type QuickActionTileProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  subtitle: string;
  tone?: QuickActionTone;
};

const toneClasses: Record<QuickActionTone, string> = {
  cyan: "border-cyan-400/30 shadow-[0_0_24px_rgba(0,245,255,0.14)]",
  pink: "border-fuchsia-400/30 shadow-[0_0_24px_rgba(255,43,214,0.14)]",
  green: "border-lime-400/30 shadow-[0_0_24px_rgba(57,255,20,0.14)]",
  purple: "border-violet-400/30 shadow-[0_0_24px_rgba(157,77,255,0.14)]"
};

export function QuickActionTile({
  title,
  subtitle,
  tone = "cyan",
  className,
  type = "button",
  ...props
}: QuickActionTileProps) {
  return (
    <button
      type={type}
      className={cn(
        "w-full rounded-[24px] border bg-white/5 p-4 text-left text-white transition-transform duration-200 active:scale-[0.98]",
        toneClasses[tone],
        className
      )}
      {...props}
    >
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-2 text-xs leading-5 text-white/60">{subtitle}</p>
    </button>
  );
}
