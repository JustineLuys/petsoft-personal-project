import { z } from "zod";
import { petFormSchema } from "./schema";

export type TPetForm = z.infer<typeof petFormSchema>;

export type PetFormActions = "add" | "edit";
