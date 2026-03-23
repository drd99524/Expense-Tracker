import { redirect } from "next/navigation";
import { getServerSessionUser } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export default async function SignupPage() {
  const user = await getServerSessionUser();

  if (user) {
    redirect("/");
  }

  redirect("/login");
}
