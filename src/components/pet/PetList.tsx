"use client";

import { usePetContext } from "@/lib/hooks";
import PetButton from "./PetButton";
import PetListItem from "./PetListItem";

export default function PetList() {
  const {
    optimisticAndFilteredPets: pets,
    handleSelectedPetId,
    selectedPetId,
  } = usePetContext();
  return (
    <>
      {!pets.length ? (
        <EmptyPetList />
      ) : (
        <ul>
          {pets.map((pet) => (
            <PetListItem
              key={pet.id}
              pet={pet}
              selectedPetId={selectedPetId!}
              handleSelectPet={() => handleSelectedPetId(pet.id)}
            />
          ))}
        </ul>
      )}

      <PetButton actionType="add" className="absolute bottom-8 right-8" />
    </>
  );
}

function EmptyPetList() {
  return (
    <ul className="h-full text-black flex items-center justify-center text-2xl">
      Pet list is empty 🐾
    </ul>
  );
}
