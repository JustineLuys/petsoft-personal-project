"use client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import PetForm from "../forms/PetForm";
import { useState } from "react";
import { PetFormActions } from "@/lib/types";
import { cn } from "@/lib/utils";

type PetButtonProps = {
  actionType: PetFormActions;
  className?: string;
};
export default function PetButton({ actionType, className }: PetButtonProps) {
  const text = actionType === "add" ? "+" : "Edit Pet";
  const [isOpen, setIsOpen] = useState(false);
  const handleFormSubmit = () => {
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(className)}
          size={actionType === "add" ? "xl" : "icon"}
        >
          <p className={`text-${actionType === "add" ? "3xl" : "lg"}`}>
            {text}
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add a new pet" : " Edit pet"}
          </DialogTitle>
        </DialogHeader>
        <PetForm onFormSubmit={handleFormSubmit} actionType={actionType} />
      </DialogContent>
    </Dialog>
  );
}
