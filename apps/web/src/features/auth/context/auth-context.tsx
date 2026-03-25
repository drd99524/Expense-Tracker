"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toPublicUser, type PublicUser } from "@/lib/auth-user";
import { createClient } from "@/lib/supabase/client";

type AuthUser = PublicUser;

type SignInInput = {
  email: string;
  password: string;
};

type SignUpInput = {
  email: string;
  password: string;
};

type AuthResult = {
  ok: boolean;
  error?: string;
  message?: string;
  needsEmailConfirmation?: boolean;
};

type AuthContextValue = {
  isReady: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
  signIn: (input: SignInInput) => Promise<AuthResult>;
  signUp: (input: SignUpInput) => Promise<AuthResult>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function normalizeAuthError(error: string) {
  const value = error.trim();

  if (value === "Invalid login credentials") {
    return "Incorrect email or password.";
  }

  if (value === "User already registered") {
    return "An account with that email already exists.";
  }

  if (value === "Email not confirmed") {
    return "Check your inbox to confirm your email before signing in.";
  }

  return value || "Request failed.";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function loadSession() {
      try {
        const {
          data: { user: sessionUser },
        } = await supabase.auth.getUser();

        if (isActive) {
          setUser(sessionUser ? toPublicUser(sessionUser) : null);
        }
      } catch {
        if (isActive) {
          setUser(null);
        }
      } finally {
        if (isActive) {
          setIsReady(true);
        }
      }
    }

    void loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isActive) {
        return;
      }

      setUser(session?.user ? toPublicUser(session.user) : null);
      setIsReady(true);
    });

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const value = useMemo<AuthContextValue>(
    () => ({
      isReady,
      isAuthenticated: user !== null,
      user,
      async signIn(input) {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: normalizeEmail(input.email),
            password: input.password,
          });

          if (error) {
            return {
              ok: false,
              error: normalizeAuthError(error.message),
            };
          }

          setUser(data.user ? toPublicUser(data.user) : null);

          return { ok: true };
        } catch {
          return {
            ok: false,
            error: "Unable to sign in right now.",
          };
        }
      },
      async signUp(input) {
        try {
          const { data, error } = await supabase.auth.signUp({
            email: normalizeEmail(input.email),
            password: input.password,
          });

          if (error) {
            return {
              ok: false,
              error: normalizeAuthError(error.message),
            };
          }

          const nextUser = data.user ? toPublicUser(data.user) : null;
          const hasSession = Boolean(data.session);

          if (hasSession && nextUser) {
            setUser(nextUser);
            return { ok: true };
          }

          return {
            ok: true,
            needsEmailConfirmation: true,
            message:
              "Account created. Check your email to confirm your address before signing in.",
          };
        } catch {
          return {
            ok: false,
            error: "Unable to create your account right now.",
          };
        }
      },
      async signOut() {
        try {
          await supabase.auth.signOut();
        } finally {
          setUser(null);
        }
      },
    }),
    [isReady, supabase, user],
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
