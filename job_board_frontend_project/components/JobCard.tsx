import { Job } from "../interfaces/Job";
import Link from "next/link";

interface Props {
  job: Job;
}

export default function JobCard({ job }: Props) {
  return (
    <div className="job-card">
      <h2 className="job-card-title">{job.title}</h2>
      <p className="job-card-meta">{job.company} - {job.location}</p>
      <p className="job-card-description">{job.description}</p>
      <Link
        href={`/jobs/${job.id}`}
        className="job-card-link"
      >
        View Details →
      </Link>
    </div>
  );
}