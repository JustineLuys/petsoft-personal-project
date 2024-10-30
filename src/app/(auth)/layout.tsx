import Logo from "@/components/Logo";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={`antialiased bg-[#E5E8EC] min-h-screen flex flex-col items-center justify-center gap-6`}
    >
      <Logo />
      {children}
      <Toaster position="top-right" />
    </main>
  );
}
