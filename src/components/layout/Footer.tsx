import Link from "next/link";
import { FaFacebook, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="md:mt-auto text-black/60 font-sembold text-lg px-8 border-t flex items-center justify-between border-black/10 pt-5 ">
      &copy; 2030 Justine Luyon. All rights reserved.
      <ul className="flex gap-4">
        <li>
          <Link href="https://www.facebook.com/Jstnzxc/">
            <FaFacebook size={30} />
          </Link>
        </li>
        <li>
          <Link href="https://github.com/JustineLuys">
            <FaGithub size={30} />
          </Link>
        </li>
      </ul>
    </footer>
  );
}
