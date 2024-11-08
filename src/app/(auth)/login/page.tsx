import AuthPage from "@/components/auth/AuthPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In | PetSoft",
  description: "Sign up for an account",
};

export default function LoginPage() {
  return <AuthPage type="login" />;
}
