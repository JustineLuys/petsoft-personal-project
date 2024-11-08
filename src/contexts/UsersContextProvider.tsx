"use client";

import { Pet, User } from "@prisma/client";
import { createContext, useMemo, useState } from "react";

type UsersContextType = {
  sortedUsersData: User[];
  handleSelectUserId: (id: string) => void;
  getPetsByUserId: (id: string) => Pet[];
  selectedUserPets: Pet[];
  selectedUserId: string | null;
  selectedUserData: User | null;
};

type UsersContextProviderProps = {
  pets: Pet[];
  users: User[];
  children: React.ReactNode;
};

export const UsersContext = createContext<UsersContextType | null>(null);

export default function UsersContextProvider({
  users,
  pets,
  children,
}: UsersContextProviderProps) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const selectedUserData =
    (selectedUserId && users.find((u) => u.id === selectedUserId)) || null;

  const selectedUserPets =
    (selectedUserId && pets.filter((pet) => pet.userId === selectedUserId)) ||
    [];

  const sortedUsersData = useMemo(
    () => [...users].sort((a, b) => a.name.localeCompare(b.name)),
    [users]
  );

  const handleSelectUserId = (id: string) => {
    return id === selectedUserId
      ? setSelectedUserId(null)
      : setSelectedUserId(id);
  };

  const getPetsByUserId = (id: string) => {
    return pets.filter((pet) => pet.userId === id);
  };

  return (
    <UsersContext.Provider
      value={{
        sortedUsersData,
        selectedUserData,
        selectedUserId,
        selectedUserPets,
        handleSelectUserId,
        getPetsByUserId,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
