"use client";

import { authClient } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";

export function LogoutButton() {
  const handleLogOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/auth/login");
        },
      },
    });
  };

  return (
    <Button variant="destructive" onClick={handleLogOut}>
      Log out
    </Button>
  );
}
