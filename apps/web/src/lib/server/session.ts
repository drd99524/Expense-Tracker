import { toPublicUser, type PublicUser } from "@/lib/auth-user";
import { createClient } from "@/lib/supabase/server";

export async function getServerSessionUser(): Promise<PublicUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.email) {
    return null;
  }

  return toPublicUser(user);
}
