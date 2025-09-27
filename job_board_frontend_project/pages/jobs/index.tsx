import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Job } from "../../interfaces/Job";
import JobCard from "../../components/JobCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6); // Number of jobs per page

  useEffect(() => {
    api.get("/jobs/")
      .then(res => setJobs(res.data))
      .catch(err => console.error("Error fetching jobs:", err))
      .finally(() => setLoading(false));
  }, []);

  // Calculate pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages is less than max
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show limited pages with ellipsis
      if (currentPage <= 3) {
        // Near the beginning
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // In the middle
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="page-container">
      <Navbar />

      <main className="page-main">
        <h1 className="page-title">Available Jobs</h1>
        
        {/* Jobs Count */}
        <div className="jobs-count">
          Showing {currentJobs.length} of {jobs.length} jobs
        </div>

        {loading ? (
          <p className="loading-text">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="empty-text">No jobs found.</p>
        ) : (
          <>
            <div className="jobs-grid">
              {currentJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <button 
                  onClick={prevPage} 
                  disabled={currentPage === 1}
                  className="pagination-button pagination-prev"
                >
                  Previous
                </button>
                
                <div className="pagination-numbers">
                  {getPageNumbers().map((number, index) => (
                    number === '...' ? (
                      <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
                    ) : (
                      <button
                        key={number}
                        onClick={() => paginate(number as number)}
                        className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                      >
                        {number}
                      </button>
                    )
                  ))}
                </div>
                
                <button 
                  onClick={nextPage} 
                  disabled={currentPage === totalPages}
                  className="pagination-button pagination-next"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}