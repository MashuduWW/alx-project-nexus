import { Company } from "../interfaces/Company";
import Link from "next/link";

interface Props {
  company: Company;
}

export default function JobCard({ company }: Props) {
  return (
    <div className="job-card">
      <h2 className="job-card-title">{company.company_name}</h2>
      <p className="job-card-location">{company.state} - {company.country}</p>
      <p className="job-card-website">{company.website}</p>
      <Link
        href={`/jobs/${company.id}`}
        className="job-card-link"
      >
        View Details →
      </Link>
    </div>
  );
}