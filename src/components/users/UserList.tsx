"use client";
import { useUsersContext } from "@/lib/hooks";

import UserListItem from "./UserListItem";

export default function UserList() {
  const { sortedUsersData, handleSelectUserId } = useUsersContext();

  return (
    <ul>
      {sortedUsersData.map((user) => (
        <UserListItem
          key={user.id}
          name={user.name}
          onSelectUser={() => handleSelectUserId(user.id)}
          userId={user.id}
        />
      ))}
    </ul>
  );
}
