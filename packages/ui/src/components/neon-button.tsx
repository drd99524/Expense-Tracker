//packages/ui/components/neon-button.tsx

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

type NeonButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function NeonButton({
  children,
  className,
  type = "button",
  ...props
}: NeonButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 shadow-[0_0_18px_rgba(0,245,255,0.18)] transition-transform duration-200 active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}