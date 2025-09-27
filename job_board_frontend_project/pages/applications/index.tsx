import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Job } from "../../interfaces/Job";
import JobCard from "../../components/JobCard";
import Navbar from "../../components/Navbar";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    api.get("/jobs/")
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Navbar />
      <main className="jobs-page">
        <h1 className="jobs-page-title">Job Listings</h1>
        <div className="jobs-grid">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </main>
    </div>
  );
}