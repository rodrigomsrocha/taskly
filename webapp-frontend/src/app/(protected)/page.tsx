import { LogoutButton } from "@/components/logout-button";
import { authClient } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const { data } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <h1>Welcome back {data?.user.name}!</h1>
      <LogoutButton />
    </div>
  );
}
