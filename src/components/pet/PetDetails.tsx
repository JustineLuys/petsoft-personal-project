"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import PetButton from "./PetButton";
import { usePetContext } from "@/lib/hooks";

export default function PetDetails() {
  const {
    selectedPet,
    handleDeletePet,
    selectedPetId,
    sortedOptimisticPets: pets,
  } = usePetContext();

  if (!pets.length) return <EmptyPets />;
  if (!selectedPet) return <EmptyPetDetails />;
  return (
    <section className="h-full text-black bg-black/[0.02]">
      <div className="h-[150px] bg-white flex items-center justify-between px-10">
        <div className="flex items-center gap-6">
          <Image
            src={selectedPet.imageUrl}
            alt="Selected Pet"
            height={100}
            width={100}
            className="rounded-full h-[90px] w-[90px] object-cover"
          />
          <h2 className="text-3xl font-bold">{selectedPet.name}</h2>
        </div>
        <div className="flex items-center gap-4">
          <PetButton actionType="edit" />
          <Button
            variant="destructive"
            size="destructive"
            onClick={async () => await handleDeletePet(selectedPetId!)}
          >
            <p className="text-lg">Checkout</p>
          </Button>
        </div>
      </div>
      <div className="flex items-center mt-10 justify-between m-auto w-[60%] text-center">
        <div className="space-y-4">
          <p className="text-xl">OWNER NAME</p>
          <p className="text-xl">{selectedPet.name}</p>
        </div>
        <div className="space-y-4">
          <p className="text-xl">Age</p>
          <p className="text-xl">{selectedPet.age}</p>
        </div>
      </div>
      <section className="h-[55%] w-[90%] bg-white mt-8 m-auto rounded-lg shadow-lg pt-8 pl-8">
        <p className="text-lg">{selectedPet.notes}</p>
      </section>
    </section>
  );
}

function EmptyPetDetails() {
  return (
    <div className="h-full text-black flex items-center justify-center text-2xl">
      Select your pet. 🐶😸🐰🐹
    </div>
  );
}

function EmptyPets() {
  return (
    <div className="h-full text-black flex items-center justify-center text-2xl">
      Start by adding your pet. 🐶😸🐰🐹
    </div>
  );
}
