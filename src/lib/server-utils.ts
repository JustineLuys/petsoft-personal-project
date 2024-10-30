import "server-only";
import prisma from "./db";
import { unstable_cache } from "next/cache";
import bcrypt from "bcryptjs";
import { TSignUpData } from "./types";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

export const getPets = async () => {
  const session = await checkAuth();

  const pets = await prisma.pet.findMany({
    where: {
      userId: session.user!.id,
    },
  });
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

export const prepareUserData = async (data: TSignUpData) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const userData = {
    email: data.email,
    hashedPassword,
  };
  return userData;
};

export const checkIfUserExists = async (email: User["email"]) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const getUser = async (email: User["email"]) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const createUserAccount = async (userData: TSignUpData) => {
  const data = await prepareUserData(userData);

  try {
    await prisma.user.create({
      data,
    });
  } catch (error: unknown) {
    return {
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while creating your account",
    };
  }
};

export const checkAuth = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
};

export const getUserByEmail = async (email: User["email"]) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const isPetOwner = async (petId: string, userId: string) => {
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  });
  return pet?.userId === userId;
};
