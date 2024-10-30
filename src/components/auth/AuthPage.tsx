import React from "react";
import H1 from "../H1";
import AuthForm from "../forms/AuthForm";
import Link from "next/link";
import { AuthType } from "@/lib/types";

type AuthPageProps = {
  type: AuthType;
};

export default function AuthPage({ type }: AuthPageProps) {
  const text = type === "login" ? "Log In" : "Sign Up";
  const textPrompt =
    type === "login" ? "Don't have an account?" : "Already have an account?";
  const path = type === "login" ? "/signup" : "/login";
  const textLink = type === "login" ? "Sign Up" : "Log In";
  return (
    <>
      <H1 className="text-3xl font-semibold">{text}</H1>
      <AuthForm type={type} />
      <p className="text-black/[0.6]">
        {textPrompt}{" "}
        <Link href={path}>
          <span className="text-black/[0.6] font-semibold underline">
            {textLink}
          </span>
        </Link>
      </p>
    </>
  );
}
