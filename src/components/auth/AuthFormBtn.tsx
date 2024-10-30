import React from "react";
import { Button } from "../ui/button";
import { AuthType } from "@/lib/types";
import { useFormStatus } from "react-dom";

export default function AuthFormBtn({ type }: { type: AuthType }) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="w-[100px] self-center mt-4">
      {type === "login" ? "Log In" : "Sign Up"}
    </Button>
  );
}
