import { useUsersContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export default function UserListItem({
  name,
  onSelectUser,
  userId,
}: {
  name: string;
  onSelectUser: () => void;
  userId: string;
}) {
  const { selectedUserId } = useUsersContext();
  const currentSelectedUser = userId === selectedUserId;

  return (
    <li
      className={cn(
        "border-b border-black/5 h-[50px] flex items-center pl-[50px] cursor-pointer hover:bg-[#fef3c7]",
        {
          "bg-[#fef3c7]": currentSelectedUser,
        }
      )}
      onClick={onSelectUser}
    >
      {name}
    </li>
  );
}
