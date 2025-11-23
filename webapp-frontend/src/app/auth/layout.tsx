import { authClient } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (data?.session) {
    redirect("/");
  }
  return <div>{children}</div>;
}
