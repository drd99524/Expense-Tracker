"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { AuthShell } from "../components/auth-shell";

export function LoginScreen() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { signInWithGoogle } = useAuth();
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error") === "oauth";

  return (
    <AuthShell>
      <div className="rounded-[34px] border border-white/10 bg-[#060606]/95 p-6 shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
          Login
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white">
          Continue with Google
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/60">
          Sign in with your Google account through Supabase. No local password,
          no manual signup, and your data stays tied to your authenticated user.
        </p>

        {oauthError ? (
          <p className="mt-5 text-sm text-red-300">
            Google sign-in did not complete. Check your Supabase and Google
            OAuth redirect configuration, then try again.
          </p>
        ) : null}

        {errorMessage ? (
          <p className="mt-5 text-sm text-red-300">{errorMessage}</p>
        ) : null}

        <button
          type="button"
          disabled={isPending}
          onClick={async () => {
            setErrorMessage("");
            setIsPending(true);

            const result = await signInWithGoogle("/");

            if (!result.ok) {
              setErrorMessage(
                result.error ?? "Unable to start Google sign-in.",
              );
              setIsPending(false);
            }
          }}
          className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-[22px] border border-white/10 bg-white px-4 py-4 text-sm font-semibold text-black disabled:opacity-60"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M21.6 12.23c0-.68-.06-1.33-.17-1.95H12v3.69h5.39a4.61 4.61 0 0 1-2 3.03v2.52h3.24c1.9-1.75 2.97-4.34 2.97-7.29Z"
            />
            <path
              fill="#34A853"
              d="M12 22c2.7 0 4.96-.9 6.61-2.43l-3.24-2.52c-.9.6-2.05.95-3.37.95-2.6 0-4.8-1.76-5.58-4.12H3.08v2.59A9.98 9.98 0 0 0 12 22Z"
            />
            <path
              fill="#FBBC05"
              d="M6.42 13.88A5.98 5.98 0 0 1 6.11 12c0-.65.11-1.28.31-1.88V7.53H3.08A9.98 9.98 0 0 0 2 12c0 1.61.39 3.13 1.08 4.47l3.34-2.59Z"
            />
            <path
              fill="#EA4335"
              d="M12 6.01c1.47 0 2.79.5 3.82 1.5l2.86-2.86C16.95 3.03 14.7 2 12 2A9.98 9.98 0 0 0 3.08 7.53l3.34 2.59c.78-2.36 2.98-4.11 5.58-4.11Z"
            />
          </svg>
          {isPending ? "Redirecting..." : "Continue with Google"}
        </button>
      </div>
    </AuthShell>
  );
}
