"use client";

import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    pathname === path ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <Logo />
      <div className="nav-links">
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