import { Pet } from "@prisma/client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function PetListItem({
  pet,
  selectedPetId,
  handleSelectPet,
}: {
  pet: Pet;
  selectedPetId: string;
  handleSelectPet: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "h-[80px] text-black border-b border-black/[5%] flex relative overflow-hidden items-center pl-4 shadow-sm bg-white/50 gap-4 cursor-pointer hover:bg-black/[3%] transition",
        {
          "bg-black/[3%]": pet.id === selectedPetId,
        }
      )}
      onClick={handleSelectPet}
    >
      <Image
        src={pet.imageUrl}
        alt="Pet Image"
        height={50}
        width={50}
        className="h-[60px] w-[60px] rounded-full object-cover"
      />
      <p className="text-xl leading max-w-full truncate">{pet.name}</p>
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        className={cn("absolute right-0 transition-transform duration-300", {
          "translate-x-full duration-500": !isHovered,
          "translate-x-0 right-3 top-7": isHovered,
        })}
      >
        <p className="flex items-center justify-center text-base">Playing 🛝</p>
      </div>
    </li>
  );
}
