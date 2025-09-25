import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="text-2xl font-extrabold tracking-tight text-white hover:text-gray-300 transition-colors duration-200">
      <span className="text-indigo-400">Hire</span>
      <span className="text-gray-200">Spot</span>
    </Link>
  );
}
