/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";
import { signUpFormSchema } from "./schema";
import { TPetForm } from "./types";
import { Pet } from "@prisma/client";
import {
  checkAuth,
  checkIfUserExists,
  createUserAccount,
  isPetOwner,
} from "./server-utils";
import { validateData } from "./utils";
import { signIn, signOut } from "./auth";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// --- User Actions ---
export const signUp = async (userData: unknown) => {
  if (!(userData instanceof FormData)) {
    return "Invalid data";
  }
  const validatedUserData = validateData(signUpFormSchema, {
    email: userData.get("email"),
    password: userData.get("password"),
  });
  if ("message" in validatedUserData) {
    return validatedUserData.message;
  }
  const user = await checkIfUserExists(validatedUserData.email);
  if (user) {
    return "User already exists";
  }
  const error = await createUserAccount(validatedUserData);
  if (error) {
    return error;
  } else {
    await signIn("credentials", validatedUserData);
  }
};

export const logIn = async (userData: unknown) => {
  if (!(userData instanceof FormData)) {
    return "Invalid data";
  }

  try {
    await signIn("credentials", userData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return "Invalid credentials";
        }
        default:
          return "An error occurred while logging in";
      }
    }
    if (error && typeof error === "object" && "digest" in error) {
      redirect("/app/dashboard");
    }
  }
};

export const logOut = async () => {
  await signOut();
};

// --- Pet Actions ---
export const addPet = async (newPet: TPetForm) => {
  const session = await checkAuth();

  try {
    await prisma.pet.create({
      data: {
        ...newPet,
        user: {
          connect: {
            id: session.user!.id,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: "An error occurred while adding the pet",
    };
  }
  revalidatePath("/dashboard", "layout");
  return null; // Return null if no error
};

export const editPet = async (newPetData: TPetForm, petId: Pet["id"]) => {
  const session = await checkAuth();

  // Check authorization
  if (!(await isPetOwner(petId, session.user!.id!))) {
    return {
      message: "You are not authorized to edit this pet",
    };
  }

  // Update the pet
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: newPetData,
    });
  } catch (error) {
    return {
      message: "An error occurred while editing the pet",
    };
  }
  revalidatePath("/dashboard", "layout");
  return null; // Return null if no error
};

export const deletePet = async (petId: Pet["id"]) => {
  const session = await checkAuth();

  // Check authorization
  if (!(await isPetOwner(petId, session.user!.id!))) {
    return {
      message: "You are not authorized to edit this pet",
    };
  }

  // Mutate the database
  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
  } catch (error) {
    return {
      message: "An error occurred while deleting the pet",
    };
  }
  revalidatePath("/dashboard", "layout");
  return null; // Return null if no error
};

// --- Payment Actions ---
export const createCheckoutSession = async () => {
  const session = await checkAuth();

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      customer_email: session.user.email ?? "",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment?cancelled=true`,
      metadata: {
        userId: session.user.id,
      },
    });

  redirect(checkoutSession.url!);
};
