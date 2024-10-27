"use client";
import { addPet, deletePet, editPet } from "@/lib/actions";
import { petFormSchema } from "@/lib/schema";
import { Pet } from "@prisma/client";
import {
  createContext,
  startTransition,
  useMemo,
  useOptimistic,
  useState,
} from "react";

type TPetContext = {
  sortedOptimisticPets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  handleSelectedPetId: (id: string) => void;
  handleAddPet: (newPet: unknown) => Promise<string | null>;
  handleEditPet: (
    newPetData: unknown,
    petId: Pet["id"]
  ) => Promise<string | null>;
  handleDeletePet: (petId: Pet["id"]) => Promise<string | null>;
};

export const PetContext = createContext<TPetContext | null>(null);

type PetContextProviderProps = Readonly<{
  children: React.ReactNode;
  pets: Pet[];
}>;

export default function PetContextProvider({
  children,
  pets,
}: PetContextProviderProps) {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    pets,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, payload];
        case "edit":
          return state.map((pet) =>
            pet.id === payload.petId ? { ...pet, ...payload.newPetData } : pet
          );
        case "delete":
          return state.filter((pet) => pet.id !== payload.id);
        default:
          return state;
      }
    }
  );

  // Derived state
  const sortedOptimisticPets = useMemo(
    () => [...optimisticPets].sort((a, b) => a.name.localeCompare(b.name)),
    [optimisticPets]
  );

  const selectedPet = useMemo(
    () => sortedOptimisticPets.find((pet) => pet.id === selectedPetId),
    [selectedPetId, sortedOptimisticPets]
  );

  // handlers
  const handleSelectedPetId = (petId: Pet["id"]) => {
    setSelectedPetId(petId);
  };

  const handleAddPet = async (newPet: unknown) => {
    const validatedPet = petFormSchema.safeParse(newPet);
    if (!validatedPet.success) {
      return validatedPet.error.errors[0].message;
    }

    setOptimisticPets({
      action: "add",
      payload: { ...validatedPet.data, id: new Date().getTime().toString() },
    });

    const error = await addPet(validatedPet.data);
    if (error && typeof error !== "string") return error.message;
    return null;
  };

  const handleEditPet = async (newPetData: unknown, petId: Pet["id"]) => {
    const validatedPet = petFormSchema.safeParse(newPetData);
    if (!validatedPet.success) {
      return validatedPet.error.errors[0].message;
    }
    setOptimisticPets({
      action: "edit",
      payload: { petId, newPetData },
    });

    const error = await editPet(validatedPet.data, petId);

    if (error && typeof error !== "string") return error.message;
    return null;
  };

  const handleDeletePet = async (petId: Pet["id"]) => {
    startTransition(() =>
      setOptimisticPets({
        action: "edit",
        payload: { petId },
      })
    );
    const error = await deletePet(petId);

    if (error && typeof error !== "string") return error.message;
    return null;
  };

  return (
    <PetContext.Provider
      value={{
        sortedOptimisticPets,
        selectedPetId,
        selectedPet,
        handleSelectedPetId,
        handleAddPet,
        handleEditPet,
        handleDeletePet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
