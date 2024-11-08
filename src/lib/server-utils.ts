import "server-only";
import prisma from "./db";
import { unstable_cache } from "next/cache";
import bcrypt from "bcryptjs";
import { TSignUpData } from "./types";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

export const getPetsByUserId = async (userId: string) => {
  const pets = await prisma.pet.findMany({
    where: {
      userId,
    },
  });
  return pets;
};

export const getAllPets = async () => {
  return await prisma.pet.findMany();
};
export const getUsersData = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: "USER",
    },
  });
  return users;
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
    name: data.name,
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

export const checkAdminAuth = async () => {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    redirect("/admin/login");
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
