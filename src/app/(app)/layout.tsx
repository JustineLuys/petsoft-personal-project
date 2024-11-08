import BackgroundPattern from "@/components/layout/Background";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PetContextProvider from "@/contexts/PetContextProvider";
import SearchFormContextProvider from "@/contexts/SearchFormContextProvider";
import { checkAuth, getPetsByUserId } from "@/lib/server-utils";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "PetSoft Dashboard",
  description: "PetSoft Dashboard",
};

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await checkAuth();

  const pets = await getPetsByUserId(session.user.id!);
  return (
    <>
      <BackgroundPattern />
      <div className="min-h-screen flex flex-col text-white p-2 max-w-[1300px] mx-auto">
        <Header username={session.user.name!} />
        <SearchFormContextProvider>
          <PetContextProvider pets={pets}>{children}</PetContextProvider>
        </SearchFormContextProvider>
        <Footer />
      </div>
      <Toaster position="top-right" duration={2000} />
    </>
  );
}
