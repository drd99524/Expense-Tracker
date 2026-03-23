"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";

type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type AuthResult = {
  ok: boolean;
  error?: string;
};

type AuthContextValue = {
  isReady: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
  signInWithGoogle: (nextPath?: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function loadSession() {
      try {
        const response = await fetch("/api/auth/session", {
          cache: "no-store",
        });
        const body = (await response.json()) as { user: AuthUser | null };

        if (!isCancelled) {
          setUser(body.user);
        }
      } catch {
        if (!isCancelled) {
          setUser(null);
        }
      } finally {
        if (!isCancelled) {
          setIsReady(true);
        }
      }
    }

    void loadSession();

    return () => {
      isCancelled = true;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isReady,
      isAuthenticated: user !== null,
      user,
      async signInWithGoogle(nextPath = "/") {
        try {
          const supabase = createClient();
          const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`;
          const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo,
            },
          });

          if (error) {
            return {
              ok: false,
              error: error.message || "Unable to start Google sign-in.",
            };
          }

          return { ok: true };
        } catch {
          return {
            ok: false,
            error: "Unable to start Google sign-in right now.",
          };
        }
      },
      async signOut() {
        try {
          await fetch("/api/auth/signout", {
            method: "POST",
          });
        } finally {
          setUser(null);
        }
      },
    }),
    [isReady, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
