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
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow p-8 pb-20">
        <h1 className="text-3xl font-bold mb-6">Companies</h1>

        {loading ? (
          <p>Loading companies...</p>
        ) : companies.length === 0 ? (
          <p>No companies found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
