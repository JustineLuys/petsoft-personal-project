"use client";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { logOut } from "@/lib/actions";

export default function SignOutBtn() {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      disabled={pending}
      variant="outline"
      className="bg-black text-white hover:text-white hover:bg-black/80"
      onClick={async () => startTransition(async () => await logOut())}
    >
      Sign Out
    </Button>
  );
}
