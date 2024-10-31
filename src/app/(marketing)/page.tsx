import H1 from "@/components/H1";
import HomeDescription from "@/components/HomeDescription";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-appColor min-h-screen pt-6 px-6 flex flex-col lg:flex-row gap-4 lg:gap-[2rem] xl:gap-[3.5rem] items-center justify-center transition">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="Petsoft"
        width={500}
        height={500}
        className="w-auto h-[22rem] md:h-[31.25rem]"
      />
      <div className="h-[50%] mt-[3.5 rem] w-[70%] xl:w-[30%] flex flex-col m-4 gap-8 items-center text-center lg:text-left lg:items-start justify-center transition">
        <Link href="/">
          <Logo />
        </Link>
        <H1>
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </H1>
        <HomeDescription />
        <div className="flex gap-4">
          <Link href="/signup">
            <Button>Get started</Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" size="md">
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
