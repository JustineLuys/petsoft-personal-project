import Image from "next/image";
import logo from "../../public/logo.svg";
import { cn } from "@/lib/utils";

export default function Logo({ className }: Readonly<{ className?: string }>) {
  return (
    <Image
      src={logo}
      alt="Logo"
      height={50}
      width={50}
      className={cn("h-[50px] w-[50px]", className)}
    />
  );
}
