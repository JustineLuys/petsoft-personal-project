"use client";
import { useState } from "react";
import ContentBlock from "../layout/ContentBlock";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import UserList from "../users/UserList";

export default function DashboardMenu() {
  const [toggleOpen, setToggleOpen] = useState(false);
  return (
    <ContentBlock className="min-h-[49rem] w-[20%] text-black bg-transparent ">
      <div
        className={`border-black overflow-hidden transition-all duration-300 ease-in-out pt-4 mt-14 bg-[#fef3c7a8] hover:bg-[#fef3c7e8] rounded-lg ${
          toggleOpen ? "max-h-[800px] bg-[#fef3c7e8]" : "max-h-[60px]"
        }`}
      >
        <div
          className="flex items-center gap-2 pl-5 mb-4 cursor-pointer"
          onClick={() => setToggleOpen((prev) => !prev)}
        >
          <p>👤</p>
          <p>Users</p>
          {!toggleOpen ? (
            <FaChevronRight className="cursor-pointer ml-auto mr-5" />
          ) : (
            <FaChevronDown className="cursor-pointer ml-auto mr-5" />
          )}
        </div>{" "}
        <UserList />
      </div>
      <div />
    </ContentBlock>
  );
}
