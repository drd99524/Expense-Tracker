export type PublicUser = {
  id: string;
  name: string;
  email: string;
};

type UserLike = {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, unknown> | null;
};

function deriveUserName(user: Pick<UserLike, "email" | "user_metadata">) {
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

export function toPublicUser(user: UserLike): PublicUser | null {
  if (!user.email) {
    return null;
  }

  return {
    id: user.id,
    name: deriveUserName(user),
    email: user.email,
  };
}
