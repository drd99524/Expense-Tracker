"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

type MaskedDateFieldProps = {
  digits: string;
  onChange: (nextDigits: string) => void;
  className?: string;
  borderClassName?: string;
  activeTextClassName?: string;
  activeBackgroundClassName?: string;
};

const placeholderMask = "DD/MM/YYYY";
const editableSlots = [0, 1, 3, 4, 6, 7, 8, 9];

function buildMaskedChars(digits: string) {
  const chars = placeholderMask.split("");

  digits.slice(0, editableSlots.length).split("").forEach((digit, index) => {
    const targetIndex = editableSlots[index];

    chars[targetIndex] = digit;
  });

  return chars;
}

export function MaskedDateField({
  digits,
  onChange,
  className,
  borderClassName,
  activeTextClassName,
  activeBackgroundClassName
}: MaskedDateFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chars = buildMaskedChars(digits);

  return (
    <div
      className={cn(
        "relative rounded-[24px] border bg-white/[0.03] px-4 py-4",
        borderClassName ?? "border-white/10",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        value={digits}
        onChange={(event) =>
          onChange(event.target.value.replace(/\D/g, "").slice(0, 8))
        }
        className="absolute inset-0 h-full w-full opacity-0"
      />

      <div className="flex items-center gap-0.5 text-lg font-semibold tracking-[0.12em]">
        {chars.map((char, index) => {
          const isSlash = char === "/";
          const digitSlotIndex = editableSlots.indexOf(index);
          const filled = digitSlotIndex !== -1 && digitSlotIndex < digits.length;
          const active = digitSlotIndex === digits.length;

          return (
            <span
              key={`${char}-${index}`}
              className={cn(
                isSlash && "px-0.5 text-white/45",
                !isSlash &&
                  filled &&
                  "min-w-[0.7ch] text-white",
                !isSlash &&
                  !filled &&
                  !active &&
                  "min-w-[0.7ch] text-white/28",
                !isSlash &&
                  active &&
                  cn(
                    "min-w-[0.7ch] rounded-md",
                    activeBackgroundClassName ?? "bg-cyan-400/10",
                    activeTextClassName ?? "text-cyan-300"
                  )
              )}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
}
