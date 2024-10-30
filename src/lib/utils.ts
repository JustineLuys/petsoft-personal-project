import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

export function validateData<T>(
  schema: z.ZodType<T>,
  data: unknown
): T | { message: string } {
  const validatedData = schema.safeParse(data);
  if (!validatedData.success) {
    return {
      message: "Invalid form data",
    };
  }
  return validatedData.data;
}
