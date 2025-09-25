import { Job } from "../interfaces/Job";
import Link from "next/link";

interface Props {
  job: Job;
}

export default function JobCard({ job }: Props) {
  return (
    <div className="border p-4 bg-gray-300 rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p className="text-gray-600">{job.company} - {job.location}</p>
      <p className="mt-2 text-sm text-gray-500 line-clamp-2">{job.description}</p>
      <Link
        href={`/jobs/${job.id}`}
        className="text-blue-500 hover:underline mt-4 inline-block"
      >
        View Details →
      </Link>
    </div>
  );
}
