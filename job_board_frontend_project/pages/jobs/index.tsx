import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Job } from "../../interfaces/Job";
import JobCard from "../../components/JobCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/jobs/")
      .then(res => setJobs(res.data))
      .catch(err => console.error("Error fetching jobs:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow p-8 pb-20">
        <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>

        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {jobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
