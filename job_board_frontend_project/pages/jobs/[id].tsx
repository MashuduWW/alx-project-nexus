import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Job } from "../../interfaces/Job";
import Navbar from "../../components/Navbar";

export default function JobDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (id) {
      api.get(`/jobs/${id}/`)
        .then(res => setJob(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  if (!job) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <main className="p-8">
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <p>{job.company} - {job.location}</p>
        <p className="mt-4">{job.description}</p>
      </main>
    </div>
  );
}
