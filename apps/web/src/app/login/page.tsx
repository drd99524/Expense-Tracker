import { redirect } from "next/navigation";
import { getServerSessionUser } from "@/lib/server/session";
import { LoginScreen } from "@/features/auth/screens/login-screen";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const user = await getServerSessionUser();

  if (user) {
    redirect("/");
  }

  return <LoginScreen />;
}
