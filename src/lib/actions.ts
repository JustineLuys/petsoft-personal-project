/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";
import { petFormSchema } from "./schema";
import { TPetForm } from "./types";
import { Pet } from "@prisma/client";

export const addPet = async (newPet: TPetForm) => {
  console.log(newPet);
  try {
    await prisma.pet.create({
      data: newPet, // Corrected data assignment
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
