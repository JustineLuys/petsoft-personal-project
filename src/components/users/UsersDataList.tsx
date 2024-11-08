"use client";
import { useUsersContext } from "@/lib/hooks";
import UsersDataListItem from "./UsersDataListItem";

export default function UsersDataList() {
  const { sortedUsersData, selectedUserData } = useUsersContext();
  const usersToDisplay = selectedUserData
    ? [selectedUserData]
    : sortedUsersData;

  if (!usersToDisplay) return <EmptyUsersData />;

  return (
    <ul>
      {usersToDisplay.map((user) => (
        <UsersDataListItem key={user.id} user={user} />
      ))}
    </ul>
  );
}

function EmptyUsersData() {
  return <section>Select a user</section>;
}
