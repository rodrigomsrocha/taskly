import { authClient } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, error } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!data?.session || error) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
