import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export type PublicUser = {
  id: string;
  name: string;
  email: string;
};

function deriveUserName(user: {
  email?: string | null;
  user_metadata?: Record<string, unknown> | null;
}) {
  const metadata = user.user_metadata ?? {};

  const candidates = [
    metadata.full_name,
    metadata.name,
    metadata.user_name,
    metadata.preferred_username,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }
  }

  const email = user.email?.trim();

  if (email) {
    return email.split("@")[0] ?? email;
  }

  return "User";
}

export async function getServerSessionUser(): Promise<PublicUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.email) {
    return null;
  }

  return {
    id: user.id,
    name: deriveUserName(user),
    email: user.email,
  };
}

export async function clearServerSession(_response?: NextResponse) {
  const supabase = await createClient();

  await supabase.auth.signOut();
}
