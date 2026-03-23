"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  const { isAuthenticated, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isReady, router]);

  if (!isReady || isAuthenticated) {
    return <main className="min-h-[100dvh] bg-[#040404]" />;
  }

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[#040404] px-4 pb-6 pt-4 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-8 top-12 h-40 w-40 rounded-full bg-cyan-400/8 blur-3xl" />
        <div className="absolute bottom-16 right-0 h-48 w-48 rounded-full bg-white/[0.04] blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-md">
        {children}
      </div>
    </main>
  );
}
