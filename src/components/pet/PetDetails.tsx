"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import PetButton from "./PetButton";
import { usePetContext } from "@/lib/hooks";
import { useTransition } from "react";

export default function PetDetails() {
  const {
    selectedPet,
    handleDeletePet,
    selectedPetId,
    optimisticAndFilteredPets: pets,
  } = usePetContext();

  const [isPending, startTransition] = useTransition();
  if (!pets.length) return <EmptyPets />;
  if (!selectedPet) return <EmptyPetDetails />;
  return (
    <section className="h-full text-black bg-black/[3%] w-full">
      <div className="h-[250px] md:h-[150px] bg-white flex flex-col md:flex-row items-center gap-6 p-4 md:p-0 md:justify-between px-4 md:px-10">
        <div className="flex flex-col items-center md:flex-row gap-4 xl:gap-6">
          <Image
            src={selectedPet.imageUrl}
            alt="Selected Pet"
            height={100}
            width={100}
            className="rounded-full h-[90px] w-[90px] object-cover"
          />
          <h2 className="text-3xl font-bold truncate xl:truncate-none max-w-[180px] lg:max-w-[300px]">
            {selectedPet.name}
          </h2>
        </div>
        <div className="flex flex-row md:flex-col-reverse lg:flex-row items-center gap-4 mr-[12px]">
          <Button
            disabled={isPending}
            variant="destructive"
            size="destructive"
            onClick={async () => {
              startTransition(async () => {
                await handleDeletePet(selectedPetId!);
              });
            }}
          >
            <p className="text-lg">Checkout</p>
          </Button>
          <PetButton actionType="edit" className="w-[110px]" />
        </div>
      </div>
      <div className="flex items-center mt-10 justify-between m-auto w-[60%] text-center">
        <div className="space-y-4 ">
          <p className="text-xl">OWNER NAME</p>
          <p className="text-xl max-w-[130px] truncate">{selectedPet.name}</p>
        </div>
        <div className="space-y-4">
          <p className="text-xl">Age</p>
          <p className="text-xl">{selectedPet.age}</p>
        </div>
      </div>
      <section className="h-[40%] lg:h-[53%] w-[90%] bg-white mt-8 m-auto rounded-lg shadow-lg pt-8 pl-8">
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
