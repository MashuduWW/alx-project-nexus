"use client";

import { useState } from "react";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function RecruiterRegister() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    company_name: "",
    company_size: "",
    country: "",
    state: "",
    website: "",
    contact_number: "",
    bio: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      country: form.country,
      state: form.state,
      website: form.website,
      contact_number: form.contact_number,
      bio: form.bio,
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
        country: "",
        state: "",
        website: "",
        contact_number: "",
        bio: "",
      });
    } catch (err: any) {
      if (err.response?.data) {
        const errors = Object.entries(err.response.data)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n");
        setMessage(`❌ Error:\n${errors}`);
      } else {
        setMessage(`❌ Network error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Recruiter Registration</h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-gray-300 shadow-md rounded-lg p-8 space-y-4"
        >
          <h2 className="text-xl font-semibold">Account Details</h2>
          {["username", "email", "first_name", "last_name", "password"].map((field) => (
            <input
              key={field}
              type={field === "password" ? "password" : field === "email" ? "email" : "text"}
              name={field}
              placeholder={field.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              value={(form as any)[field]}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required={["username", "email", "password"].includes(field)}
            />
          ))}

          <h2 className="text-xl font-semibold mt-6">Company Details</h2>

{/* Company Name */}
<input
  type="text"
  name="company_name"
  placeholder="Company Name"
  value={form.company_name}
  onChange={handleChange}
  className="w-full border rounded p-2"
/>

{/* Company Size Dropdown */}
<select
  name="company_size"
  value={form.company_size}
  onChange={handleChange}
  className="w-full border rounded p-2"
>
  <option value="">Select Company Size</option>
  <option value="1-10">1-10 employees</option>
  <option value="11-50">11-50 employees</option>
  <option value="51-200">51-200 employees</option>
  <option value="201-500">201-500 employees</option>
  <option value="501-1000">501-1000 employees</option>
  <option value="1001+">1001+ employees</option>
</select>

{/* Country, State, Website, Contact Number */}
{["country", "state", "website", "contact_number"].map((field) => (
  <input
    key={field}
    type={field === "website" ? "url" : "text"}
    name={field}
    placeholder={field.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
    value={(form as any)[field]}
    onChange={handleChange}
    className="w-full border rounded p-2"
  />
))}

{/* Bio */}
<textarea
  name="bio"
  placeholder="Company Bio"
  value={form.bio}
  onChange={handleChange}
  className="w-full border rounded p-2"
/>


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
