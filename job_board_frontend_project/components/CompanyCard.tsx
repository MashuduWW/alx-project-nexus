import { Company } from "../interfaces/Company";
import Link from "next/link";

interface Props {
  company: Company;
}

export default function JobCard({ company }: Props) {
  return (
    <div className="border p-4 bg-gray-300 rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{company.company_name}</h2>
      <p className="text-gray-600">{company.state} - {company.country}</p>
      <p className="mt-2 text-sm text-gray-500 line-clamp-2">{company.website}</p>
      <Link
        href={`/jobs/${company.id}`}
        className="text-blue-500 hover:underline mt-4 inline-block"
      >
        View Details →
      </Link>
    </div>
  );
}
