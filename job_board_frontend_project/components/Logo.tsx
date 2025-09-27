import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="logo">
      <span className="logo-part-1">Hire</span>
      <span className="logo-part-2">Spot</span>
    </Link>
  );
}