"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "../Logo";

const routes = [
  {
    path: "/app/dashboard",
    name: "Dashboard",
  },
  {
    path: "/app/account",
    name: "Account",
  },
];

export default function Header() {
  const activePath = usePathname();
  return (
    <header className="flex items-center justify-between border-b border-white/20 pb-2">
      <Link href="/">
        <Logo />
      </Link>
      <HeaderList activePath={activePath} />
    </header>
  );
}

function HeaderList({ activePath }: { activePath: string }) {
  return (
    <ul className="flex gap-4 items-center">
      {routes.map(({ path, name }) => (
        <HeaderListItem
          key={path}
          path={path}
          name={name}
          activePath={activePath}
        />
      ))}
    </ul>
  );
}

type HeaderListItemProps = {
  path: string;
  name: string;
  activePath: string;
};

function HeaderListItem({ path, name, activePath }: HeaderListItemProps) {
  return (
    <li
      key={path}
      className={cn("text-white/60 hover:text-white/80 transition", {
        "text-white bg-black/20 px-2 py-1 rounded-sm transition":
          activePath === path,
      })}
    >
      <Link href={path}>{name}</Link>
    </li>
  );
}
