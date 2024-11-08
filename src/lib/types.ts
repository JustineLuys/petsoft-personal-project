import { z } from "zod";
import { logInFormSchema, petFormSchema, signUpFormSchema } from "./schema";

export type TPetForm = z.infer<typeof petFormSchema>;

export type PetFormActions = "add" | "edit";

export type AuthType = "login" | "signup";
export type RoleType = "ADMIN" | "USER";

export type TLogInData = z.infer<typeof logInFormSchema>;
export type TSignUpData = z.infer<typeof signUpFormSchema>;
