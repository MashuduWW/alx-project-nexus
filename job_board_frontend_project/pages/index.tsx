import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import api from "../utils/api";
import { Job } from "../interfaces/Job";
import { Company } from "../interfaces/Company";
import JobCard from "../components/JobCard";
import CompanyCard from "../components/CompanyCard";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'companies'>('jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data
    Promise.all([
      api.get("/jobs/"),
      api.get("/recruiters/")
    ])
    .then(([jobsRes, companiesRes]) => {
      setJobs(jobsRes.data);
      setFilteredJobs(jobsRes.data);
      setCompanies(companiesRes.data);
      setFilteredCompanies(companiesRes.data);
    })
    .catch(err => console.error("Error fetching data:", err))
    .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // Filter jobs based on search term and location
    const filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = locationFilter === '' || 
                             job.location.toLowerCase().includes(locationFilter.toLowerCase());
      return matchesSearch && matchesLocation;
    });
    setFilteredJobs(filtered);
  }, [searchTerm, locationFilter, jobs]);

  useEffect(() => {
    // Filter companies based on search term
    const filtered = companies.filter(company => {
      return company.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             company.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
             company.state.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredCompanies(filtered);
  }, [searchTerm, companies]);

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
  };

  return (
    <div className="page-container">
      <Head>
        <title>HireSpot - Find Your Dream Job</title>
        <meta name="description" content="Discover job opportunities and connect with top companies on HireSpot" />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <main className="home-main">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Find Your Dream Job
            </h1>
            <p className="hero-description">
              Discover thousands of job opportunities and connect with top companies. 
              Whether you&apos;re a jobseeker or a recruiter, we make the process simple and efficient.
            </p>

            {/* Search Bar */}
            <div className="search-container">
              <div className="search-box">
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'jobs' ? 'jobs, companies, or keywords' : 'companies or locations'}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button className="search-button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.3-4.3"/>
                  </svg>
                </button>
              </div>
              
              {activeTab === 'jobs' && (
                <input
                  type="text"
                  placeholder="Filter by location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="location-filter"
                />
              )}
              
              {(searchTerm || locationFilter) && (
                <button onClick={clearFilters} className="clear-filters">
                  Clear Filters
                </button>
              )}
            </div>

            <div className="hero-buttons">
              <Link href="/jobs" className="hero-button">
                Browse All Jobs
              </Link>
              <Link href="/companies" className="hero-button">
                Browse All Companies
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Search Results Section */}
        <section className="results-section">
          <div className="results-container">
            <div className="tabs-container">
              <button 
                className={`tab-button ${activeTab === 'jobs' ? 'active' : ''}`}
                onClick={() => setActiveTab('jobs')}
              >
                Jobs ({filteredJobs.length})
              </button>
              <button 
                className={`tab-button ${activeTab === 'companies' ? 'active' : ''}`}
                onClick={() => setActiveTab('companies')}
              >
                Companies ({filteredCompanies.length})
              </button>
            </div>

            {loading ? (
              <div className="loading-state">Loading...</div>
            ) : (
              <>
                {activeTab === 'jobs' ? (
                  <>
                    {filteredJobs.length === 0 ? (
                      <div className="empty-state">
                        {searchTerm || locationFilter ? 'No jobs match your search criteria.' : 'No jobs available at the moment.'}
                      </div>
                    ) : (
                      <div className="results-grid">
                        {filteredJobs.slice(0, 6).map(job => (
                          <JobCard key={job.id} job={job} />
                        ))}
                      </div>
                    )}
                    {filteredJobs.length > 6 && (
                      <div className="view-more-container">
                        <Link href="/jobs" className="view-more-button">
                          View All Jobs ({jobs.length})
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {filteredCompanies.length === 0 ? (
                      <div className="empty-state">
                        {searchTerm ? 'No companies match your search criteria.' : 'No companies available at the moment.'}
                      </div>
                    ) : (
                      <div className="results-grid">
                        {filteredCompanies.slice(0, 6).map(company => (
                          <CompanyCard key={company.id} company={company} />
                        ))}
                      </div>
                    )}
                    {filteredCompanies.length > 6 && (
                      <div className="view-more-container">
                        <Link href="/companies" className="view-more-button">
                          View All Companies ({companies.length})
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="features-container">
            <h2 className="features-title">
              Why Choose HireSpot?
            </h2>

            <div className="features-grid">
              <div className="feature-card">
                <h3 className="feature-heading">Smart Search</h3>
                <p className="feature-description">
                  Find exactly what you&apos;re looking for with our advanced search and filtering system.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-heading">For Job Seekers</h3>
                <p className="feature-description">
                  Explore thousands of jobs tailored to your skills and interests. Apply in just a few clicks.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-heading">For Recruiters</h3>
                <p className="feature-description">
                  Post jobs, manage applications, and connect with top talent easily and effectively.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <h4 className="cta-title">
            Ready to elevate your career or find the perfect candidate?
          </h4>
          <div className="cta-buttons">
            <Link href="/jobseeker" className="cta-button primary">
              Join as Job Seeker
            </Link>
            <Link href="/recruiter" className="cta-button secondary">
              Join as Recruiter
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}