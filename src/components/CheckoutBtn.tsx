"use client";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { createCheckoutSession } from "@/lib/actions";

export default function CheckoutBtn() {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      onClick={async () =>
        startTransition(async () => await createCheckoutSession())
      }
    >
      Buy lifetime access for $299
    </Button>
  );
}
