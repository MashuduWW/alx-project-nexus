"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { RecruiterForm } from "../../interfaces/Recruiter";

export default function RecruiterRegisterPage() {
  const router = useRouter();

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
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

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
      setForm({
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
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error && (err as any).response?.data) {
        const errors = Object.entries((err as any).response.data)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n");
        setMessage(`❌ Error:\n${errors}`);
      } else if (err instanceof Error) {
        setMessage(`❌ Network error: ${err.message}`);
      } else {
        setMessage("❌ An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Recruiter Registration
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-gray-300 shadow-md rounded-lg p-8 space-y-4"
        >
          <h2 className="text-xl font-semibold">Account Details</h2>
          {(["username", "email", "first_name", "last_name", "password"] as const).map(
            (field) => (
              <input
                key={field}
                type={
                  field === "password" ? "password" : field === "email" ? "email" : "text"
                }
                name={field}
                placeholder={field.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                value={form[field]}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required={["username", "email", "password"].includes(field)}
              />
            )
          )}

          <h2 className="text-xl font-semibold mt-6">Company Details</h2>
          {(
            [
              "company_name",
              "company_size",
              "industry",
              "country",
              "state",
              "phone_number",
              "website",
              "description",
            ] as const
          ).map((field) =>
            field === "description" ? (
              <textarea
                key={field}
                name={field}
                placeholder="Company Description"
                value={form[field]}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            ) : (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                value={form[field]}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            )
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {message && (
          <pre className="mt-4 text-center text-sm text-red-600 whitespace-pre-wrap">
            {message}
          </pre>
        )}
      </main>
      <Footer />
    </div>
  );
}
