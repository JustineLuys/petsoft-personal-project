import { Pet } from "@prisma/client";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function PetListItem({
  pet,
  selectedPetId,
  handleSelectPet,
}: {
  pet: Pet;
  selectedPetId: string;
  handleSelectPet: () => void;
}) {
  return (
    <li
      className={cn(
        "h-[80px] text-black border-b border-black/[5%]  flex items-center pl-4 shadow-sm bg-white/50 gap-4 cursor-pointer hover:bg-black/[3%] transition",
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
    </li>
  );
}
