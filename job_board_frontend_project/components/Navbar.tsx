"use client";

import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

const linkClasses = (path: string) =>
  pathname === path
    ? "text-indigo-400 font-extrabold"
    : "hover:text-indigo-400";


  return (
    <nav className="sticky top-0 z-50 p-4 bg-gray-800 text-gray-200 flex justify-between items-center shadow-md">
      <Logo />
      <div className="space-x-4 font-bold pr-8">
        <Link href="/" className={linkClasses("/")}>
          Home
        </Link>
        <Link href="/jobs" className={linkClasses("/jobs")}>
          Jobs
        </Link>
        <Link href="/jobseeker" className={linkClasses("/jobseeker")}>
          JobSeeker
        </Link>
        <Link href="/recruiter" className={linkClasses("/recruiter")}>
          Recruiter
        </Link>
        <Link href="/login" className={linkClasses("/login")}>
          Login
        </Link>
      </div>
    </nav>
  );
}
