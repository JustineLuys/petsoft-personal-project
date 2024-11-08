import BackgroundPattern from "@/components/layout/Background";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SearchFormContextProvider from "@/contexts/SearchFormContextProvider";
import UsersContextProvider from "@/contexts/UsersContextProvider";
import { checkAdminAuth, getAllPets, getUsersData } from "@/lib/server-utils";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "PetSoft Dashboard",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await checkAdminAuth();
  const usersData = await getUsersData();
  const pets = await getAllPets();

  return (
    <>
      <BackgroundPattern />
      <div className="min-h-screen flex flex-col text-white p-2 max-w-[1300px] mx-auto">
        <Header username={session.user.name!} />
        <SearchFormContextProvider>
          <UsersContextProvider users={usersData} pets={pets}>
            {children}
          </UsersContextProvider>
        </SearchFormContextProvider>
        <Footer />
      </div>
      <Toaster position="top-right" duration={2000} />
    </>
  );
}
