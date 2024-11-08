"use client";
import { addPet, deletePet, editPet } from "@/lib/actions";
import { useSearchFormContext } from "@/lib/hooks";
import { petFormSchema } from "@/lib/schema";
import { Pet } from "@prisma/client";
import {
  createContext,
  startTransition,
  useCallback,
  useMemo,
  useOptimistic,
  useState,
} from "react";

type TPetContext = {
  optimisticAndFilteredPets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  petCount: number;
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
  const { searchText } = useSearchFormContext();
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

  const petCount = optimisticPets.length;

  const optimisticAndFilteredPets = !searchText
    ? optimisticPets
    : optimisticPets.filter((pet) =>
        pet.name.toLowerCase().includes(searchText.toLowerCase())
      );

  const selectedPet = useMemo(
    () => optimisticPets.find((pet) => pet.id === selectedPetId),
    [selectedPetId, optimisticPets]
  );

  // handlers
  const handleSelectedPetId = useCallback((petId: Pet["id"]) => {
    setSelectedPetId(petId);
  }, []);

  const handleAddPet = useCallback(
    async (newPet: unknown) => {
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
    },
    [setOptimisticPets]
  );

  const handleEditPet = useCallback(
    async (newPetData: unknown, petId: Pet["id"]) => {
      const validatedPet = petFormSchema.safeParse(newPetData);
      if (!validatedPet.success) {
        return validatedPet.error.errors[0].message;
      }
      setOptimisticPets({
        action: "edit",
        payload: { petId, newPetData },
      });

      const error = await editPet(validatedPet.data, petId);

      if (error) return error.message;
      return null;
    },
    [setOptimisticPets]
  );

  const handleDeletePet = useCallback(
    async (petId: Pet["id"]) => {
      startTransition(() =>
        setOptimisticPets({
          action: "edit",
          payload: { petId },
        })
      );
      const error = await deletePet(petId);

      if (error && typeof error !== "string") return error.message;
      return null;
    },
    [setOptimisticPets]
  );

  const contextValue = useMemo(
    () => ({
      optimisticAndFilteredPets,
      selectedPetId,
      selectedPet,
      petCount,
      handleSelectedPetId,
      handleAddPet,
      handleEditPet,
      handleDeletePet,
    }),
    [
      optimisticAndFilteredPets,
      selectedPetId,
      selectedPet,
      petCount,
      handleSelectedPetId,
      handleAddPet,
      handleEditPet,
      handleDeletePet,
    ]
  );

  return (
    <PetContext.Provider value={contextValue}>{children}</PetContext.Provider>
  );
}
