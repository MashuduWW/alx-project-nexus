"use client";

import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Company } from "../../interfaces/Company";
import CompanyCard from "../../components/CompanyCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/recruiters/")
      .then(res => setCompanies(res.data))
      .catch(err => console.error("Error fetching companies:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <Navbar />

      <main className="page-main">
        <h1 className="page-title">Companies</h1>

        {loading ? (
          <p className="loading-text">Loading companies...</p>
        ) : companies.length === 0 ? (
          <p className="empty-text">No companies found.</p>
        ) : (
          <div className="companies-grid">
            {companies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}