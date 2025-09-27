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

  if (!job) return <div className="loading">Loading...</div>;

  return (
    <div>
      <Navbar />
      <main className="job-detail">
        <h1 className="job-detail-title">{job.title}</h1>
        <p className="job-detail-meta">{job.company} - {job.location}</p>
        <p className="job-detail-description">{job.description}</p>
      </main>
    </div>
  );
}