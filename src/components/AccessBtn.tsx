"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

export default function AccessBtn() {
  const { data: session, update, status } = useSession();
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        await update(true);
        router.push("/app/dashboard");
      }}
      disabled={status === "loading" || session?.user.hasAccess}
    >
      Access PetSoft
    </Button>
  );
}
