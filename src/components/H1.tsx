import { cn } from "@/lib/utils";
import React from "react";

export default function H1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h1 className={cn("text-5xl font-bold", className)}>{children}</h1>;
}
