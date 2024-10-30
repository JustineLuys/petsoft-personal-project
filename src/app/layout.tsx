import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "PetSoft",
  description: "PetSoft a software to take care of your pets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-[#E5E8EC]`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
