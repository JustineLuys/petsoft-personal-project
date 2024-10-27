import "server-only";
import prisma from "./db";
import { unstable_cache } from "next/cache";

export const getPets = async () => {
  const pets = await prisma.pet.findMany();
  return pets;
};

export const getPet = unstable_cache(
  async (id: string) => {
    const pets = await prisma.pet.findUnique({
      where: {
        id,
      },
    });
    return pets;
  },
  ["id"]
);
