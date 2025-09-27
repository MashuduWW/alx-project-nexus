"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import { Company } from "../../interfaces/Company";
import { RecruiterForm } from "../../interfaces/Recruiter";
import CompanyCard from "../../components/CompanyCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CompaniesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'browse' | 'register'>('browse');
  
  // Companies state
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Registration form state
  const [form, setForm] = useState<RecruiterForm>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    company_name: "",
    company_size: "",
    industry: "",
    country: "",
    state: "",
    phone_number: "",
    website: "",
    description: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [registerLoading, setRegisterLoading] = useState(false);

  // Fetch companies
  useEffect(() => {
    if (activeTab === 'browse') {
      api.get("/recruiters/")
        .then(res => setCompanies(res.data))
        .catch(err => console.error("Error fetching companies:", err))
        .finally(() => setLoading(false));
    }
  }, [activeTab]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompanies = companies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  // Pagination functions
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Registration form handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setRegisterLoading(true);

    const payload = {
      user: {
        username: form.username,
        email: form.email,
        first_name: form.first_name,
        last_name: form.last_name,
        password: form.password,
      },
      company_name: form.company_name,
      company_size: form.company_size,
      industry: form.industry,
      country: form.country,
      state: form.state,
      phone_number: form.phone_number,
      website: form.website,
      description: form.description,
    };

    try {
      await api.post("/recruiters/", payload);
      setMessage("✅ Recruiter registered successfully!");
      // Reset form
      setForm({
        username: "", email: "", first_name: "", last_name: "", password: "",
        company_name: "", company_size: "", industry: "", country: "", state: "",
        phone_number: "", website: "", description: "",
      });
      // Refresh companies list
      api.get("/recruiters/").then(res => setCompanies(res.data));
      // Switch to browse tab after successful registration
      setTimeout(() => setActiveTab('browse'), 2000);
    } catch (err: any) {
      const errors = err.response?.data ? Object.entries(err.response.data)
        .map(([key, value]) => `${key}: ${value}`).join("\n") : "Network error";
      setMessage(`❌ Error:\n${errors}`);
    } finally {
      setRegisterLoading(false);
    }
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        pageNumbers.push('...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, '...');
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1, '...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pageNumbers.push(i);
        pageNumbers.push('...', totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="page-container">
      <Navbar />

      <main className="page-main">
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'browse' ? 'active' : ''}`}
            onClick={() => setActiveTab('browse')}
          >
            Browse Companies ({companies.length})
          </button>
          <button 
            className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register Your Company
          </button>
        </div>

        {/* Browse Companies Tab */}
        {activeTab === 'browse' && (
          <>
            <h1 className="page-title">Companies</h1>
            
            <div className="items-count">
              Showing {currentCompanies.length} of {companies.length} companies
            </div>

            {loading ? (
              <p className="loading-text">Loading companies...</p>
            ) : companies.length === 0 ? (
              <div className="empty-state">
                <p>No companies registered yet.</p>
                <button 
                  onClick={() => setActiveTab('register')}
                  className="cta-button primary"
                >
                  Be the first to register!
                </button>
              </div>
            ) : (
              <>
                <div className="companies-grid">
                  {currentCompanies.map(company => (
                    <CompanyCard key={company.id} company={company} />
                  ))}
                </div>

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
          </>
        )}

        {/* Registration Form Tab */}
        {activeTab === 'register' && (
          <>
            <h1 className="form-page-title">Register Your Company</h1>

            <form onSubmit={handleSubmit} className="registration-form narrow-form">
              <h2 className="form-section-heading">Account Details</h2>
              {(["username", "email", "first_name", "last_name", "password"] as const).map(
                (field) => (
                  <input
                    key={field}
                    type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={field.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    value={form[field]}
                    onChange={handleChange}
                    className="form-input"
                    required={["username", "email", "password"].includes(field)}
                  />
                )
              )}

              <h2 className="form-section-heading">Company Details</h2>
              
              {/* Company Size Dropdown */}
              <select
                name="company_size"
                value={form.company_size}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Company Size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>

              {/* Industry Dropdown */}
              <select
                name="industry"
                value={form.industry}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="education">Education</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail</option>
                <option value="other">Other</option>
              </select>

              {(["company_name", "country", "state", "phone_number", "website", "description"] as const).map(
                (field) =>
                  field === "description" ? (
                    <textarea
                      key={field}
                      name={field}
                      placeholder="Company Description"
                      value={form[field]}
                      onChange={handleChange}
                      className="form-textarea"
                    />
                  ) : (
                    <input
                      key={field}
                      type={field === "website" ? "url" : "text"}
                      name={field}
                      placeholder={field.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      value={form[field]}
                      onChange={handleChange}
                      className="form-input"
                    />
                  )
              )}

              <button
                type="submit"
                disabled={registerLoading}
                className={`form-button ${registerLoading ? "form-button-disabled" : "form-button-primary"}`}
              >
                {registerLoading ? "Registering..." : "Register Company"}
              </button>
            </form>

            {message && (
              <pre className="form-message">
                {message}
              </pre>
            )}

            <div className="form-footer">
              <p>Already have a company listed? <button onClick={() => setActiveTab('browse')} className="text-link">Browse companies</button></p>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}