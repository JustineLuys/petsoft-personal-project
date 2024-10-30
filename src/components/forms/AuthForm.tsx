"use client";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AuthType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInFormSchema, signUpFormSchema } from "@/lib/schema";
import AuthFormBtn from "../auth/AuthFormBtn";
import { logIn, signUp } from "@/lib/actions";
import { toast } from "sonner";

export default function AuthForm({ type }: { type: AuthType }) {
  const {
    register,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(
      type === "signup" ? signUpFormSchema : logInFormSchema
    ),
  });

  const handleAction = async (formData: FormData) => {
    const result = await trigger();
    if (!result) return;

    const error =
      type === "signup" ? await signUp(formData) : await logIn(formData);

    if (error) {
      toast.error(typeof error === "string" ? error : error.message);
      return;
    } else {
      toast.success(
        type === "signup" ? "Account created successfully" : "Logged in"
      );
    }
  };

  return (
    <form action={handleAction} className="flex flex-col gap-4 items-center">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-lg">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="border border-black/[30%]"
        />
        {errors.email && (
          <div className="text-red-500 italic">{`${errors.email.message}`}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-lg">
          Password
        </Label>
        <Input
          id="password"
          {...register("password")}
          type="password"
          className="border border-black/[30%]"
        />
        {errors.password && (
          <div className="text-red-500 italic ">{`${errors.password.message}`}</div>
        )}
      </div>
      <AuthFormBtn type={type} />
    </form>
  );
}
