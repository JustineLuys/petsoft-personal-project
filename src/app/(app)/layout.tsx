import BackgroundPattern from "@/components/layout/Background";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PetContextProvider from "@/contexts/PetContextProvider";
import { getPets } from "@/lib/server-utils";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "PetSoft Dashboard",
  description: "PetSoft Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pets = await getPets();
  return (
    <>
      <BackgroundPattern />
      <div className="min-h-screen flex flex-col text-white p-2 max-w-[1300px] mx-auto">
        <Header />
        <PetContextProvider pets={pets}>{children}</PetContextProvider>
        <Footer />
      </div>
      <Toaster position="top-right" duration={1500} />
    </>
  );
}
