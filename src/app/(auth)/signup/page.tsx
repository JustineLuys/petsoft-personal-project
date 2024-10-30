import AuthPage from "@/components/auth/AuthPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | PetSoft",
  description: "Sign up for an account",
};

export default function SignUpPage() {
  return <AuthPage type="signup" />;
}
