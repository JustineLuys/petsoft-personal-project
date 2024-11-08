import { useUsersContext } from "@/lib/hooks";
import { User } from "@prisma/client";
import { FaEllipsisH } from "react-icons/fa";

export default function UsersDataListItem({ user }: { user: User }) {
  const { getPetsByUserId } = useUsersContext();
  const pets = getPetsByUserId(user.id);
  const petCount = pets.length;

  return (
    <li className="flex items-center justify-start ml-8 gap-2 text-left mb-4">
      <div className="min-w-[100px]">{user.name}</div>
      <div className="min-w-[250px] text-left">{user.id}</div>
      <div className="min-w-[200px] text-left truncate">{user.email}</div>
      <div className="min-w-[120px]">
        {new Date(user.createdAt).toLocaleString("en-us", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}
      </div>
      <div className="min-w-[20px] text-center ml-5">{petCount}</div>
      <FaEllipsisH className="cursor-pointer hover:bg-black/10" />
    </li>
  );
}
