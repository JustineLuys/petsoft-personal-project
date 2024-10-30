"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { usePetContext } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { petFormSchema } from "@/lib/schema";
import { PetFormActions, TPetForm } from "@/lib/types";
import { toast } from "sonner";

type PetFormProps = {
  onFormSubmit: () => void;
  actionType: PetFormActions;
};
export default function PetForm({ onFormSubmit, actionType }: PetFormProps) {
  const { handleAddPet, handleEditPet, selectedPet, selectedPetId } =
    usePetContext();

  const {
    formState: { errors },
    register,
    trigger,
    getValues,
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: actionType === "edit" ? selectedPet?.name : "",
      ownerName: actionType === "edit" ? selectedPet?.ownerName : "",
      imageUrl: actionType === "edit" ? selectedPet?.imageUrl : "",
      age: actionType === "edit" ? selectedPet?.age : undefined,
      notes: actionType === "edit" ? selectedPet?.notes : "",
    },
  });

  const handleAction = async () => {
    onFormSubmit();
    const result = await trigger();
    if (!result) return;

    toast.success(
      `Pet has been successfully ${
        actionType === "edit" ? "updated" : "added"
      }.`
    );
    const petData = {
      ...getValues(),
      imageUrl:
        getValues("imageUrl") ||
        "https://cdn.oneesports.gg/cdn-data/2023/05/Anime_DemonSlayer_MuichiroTokito_MistHashira_2-1024x576.webp",
    };

    if (actionType === "add") {
      const error = await handleAddPet(petData);
      if (error) {
        toast.warning(error);
      }
    }

    if (actionType === "edit") {
      const error = await handleEditPet(petData, selectedPetId!);
      if (error) toast.warning(error);
    }
  };

  return (
    <form action={handleAction} className="flex flex-col gap-4 justify-center">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-base">
          Pet Name
        </Label>
        <Input type="text" id="name" {...register("name")} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="ownerName" className="text-base">
          Owner Name
        </Label>
        <Input type="text" id="ownerName" {...register("ownerName")} />
        {errors.ownerName && (
          <p className="text-red-500">{errors.ownerName.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="imageUrl" className="text-base">
          Image URL
        </Label>
        <Input type="text" id="imageUrl" {...register("imageUrl")} />
        {errors.imageUrl && (
          <p className="text-red-500">{errors.imageUrl.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="age" className="text-base">
          Age
        </Label>
        <Input type="number" id="age" {...register("age")} />
        {errors.age && <p className="text-red-500">{errors.age.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes" className="text-base">
          Notes
        </Label>
        <Textarea id="notes" rows={6} {...register("notes")} />
        {errors.notes && <p className="text-red-500">{errors.notes.message}</p>}
      </div>
      <Button variant="addPet" size="md" className="self-end">
        {actionType === "edit" ? "Update Pet" : "Add Pet"}
      </Button>
    </form>
  );
}
