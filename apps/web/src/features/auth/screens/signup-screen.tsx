"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { AuthShell } from "../components/auth-shell";
import { PasswordField } from "../components/password-field";
import { useAuth } from "../context/auth-context";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function SignupScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!isValidEmail(email)) {
      setErrorMessage("Enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Use a password with at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const result = await signUp({
      email,
      password,
    });

    if (!result.ok) {
      setErrorMessage(result.error ?? "Unable to create your account.");
      return;
    }

    if (result.needsEmailConfirmation) {
      setSuccessMessage(
        result.message ??
          "Account created. Check your email to confirm your address before signing in.",
      );
      setPassword("");
      setConfirmPassword("");
      return;
    }

    startTransition(() => {
      router.replace("/dashboard");
      router.refresh();
    });
  }

  return (
    <AuthShell>
      <div className="rounded-[34px] border border-white/10 bg-[#060606]/95 p-6 shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
          Sign Up
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white">
          Create your account
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/60">
          Register with your email address and a password to create a private
          account. Your budgets, expenses, and history stay isolated to the
          account tied to that email.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm text-white/55">Email</span>
            <input
              type="email"
              autoComplete="email"
              disabled={isPending}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorMessage("");
                setSuccessMessage("");
              }}
              className="mt-2 w-full rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4 text-white outline-none placeholder:text-white/20"
              placeholder="you@example.com"
            />
          </label>

          <PasswordField
            label="Password"
            autoComplete="new-password"
            value={password}
            disabled={isPending}
            onChange={(event) => {
              setPassword(event.target.value);
              setErrorMessage("");
              setSuccessMessage("");
            }}
            placeholder="Create a password"
          />

          <PasswordField
            label="Confirm password"
            autoComplete="new-password"
            value={confirmPassword}
            disabled={isPending}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              setErrorMessage("");
              setSuccessMessage("");
            }}
            placeholder="Repeat your password"
          />

          <p className="text-xs leading-5 text-white/45">
            Use at least 8 characters. If email confirmation is enabled in your
            Supabase project, you will need to confirm your address before your
            first sign-in.
          </p>

          {errorMessage ? (
            <p className="text-sm text-red-300">{errorMessage}</p>
          ) : null}

          {successMessage ? (
            <p className="text-sm text-cyan-200">{successMessage}</p>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex w-full items-center justify-center rounded-[22px] border border-cyan-400/40 bg-cyan-400/10 px-4 py-4 text-sm font-medium text-cyan-300 disabled:opacity-60"
          >
            {isPending ? "Creating account..." : "Create account"}
          </button>
        </form>

        <Link
          href="/login"
          className="mt-3 inline-flex w-full items-center justify-center rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-medium text-white/75"
        >
          Already have an account? Sign in
        </Link>
      </div>
    </AuthShell>
  );
}
