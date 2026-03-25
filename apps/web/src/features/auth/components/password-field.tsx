"use client";

import { useState, type InputHTMLAttributes } from "react";

type PasswordFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label: string;
};

export function PasswordField({ label, className, ...props }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const disabled = Boolean(props.disabled);

  return (
    <label className="block">
      <span className="text-sm text-white/55">{label}</span>
      <div className="mt-2 flex items-center rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4">
        <input
          {...props}
          type={visible ? "text" : "password"}
          className={`w-full border-0 bg-transparent text-white outline-none placeholder:text-white/20 ${className ?? ""}`}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => setVisible((current) => !current)}
          className="ml-3 text-xs font-medium uppercase tracking-[0.16em] text-cyan-300/80 disabled:opacity-40"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    </label>
  );
}
