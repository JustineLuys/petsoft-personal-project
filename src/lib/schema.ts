import z from "zod";

export const petFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Pet name is required" })
      .max(100),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner name is required" })
      .max(100),
    imageUrl: z.union([
      z.string().trim().url({ message: "Invalid URL" }),
      z.literal(""),
    ]),
    age: z.coerce
      .number({
        message: "Age must be a number",
      })
      .positive({
        message: "Age is required and must be a positive number",
      })
      .int(),
    notes: z.string().trim().max(500),
  })
  .transform((data) => ({
    ...data,
    imageUrl:
      data.imageUrl ||
      "https://cdn.oneesports.gg/cdn-data/2023/05/Anime_DemonSlayer_MuichiroTokito_MistHashira_2-1024x576.webp",
  }));
