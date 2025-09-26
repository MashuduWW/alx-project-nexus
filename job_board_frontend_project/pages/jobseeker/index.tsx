"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { JobseekerForm } from "../../interfaces/Jobseeker";

export default function JobseekerRegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState<JobseekerForm>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    gender: "",
    ethnicity: "",
    country: "",
    state: "",
    cell_number: "",
    skills: "",
    experience: "",
    bio: "",
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
      gender: form.gender,
      ethnicity: form.ethnicity,
      country: form.country,
      state: form.state,
      cell_number: form.cell_number,
      skills: form.skills,
      experience: form.experience,
      bio: form.bio,
    };

    try {
      await api.post("/jobseekers/", payload);
      setMessage("✅ JobSeeker registered successfully!");
      setForm({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        gender: "",
        ethnicity: "",
        country: "",
        state: "",
        cell_number: "",
        skills: "",
        experience: "",
        bio: "",
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
          JobSeeker Registration
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

          <h2 className="text-xl font-semibold mt-6">Profile Details</h2>

          {/* Gender Dropdown */}
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_say">Prefer not to say</option>
          </select>

          {/* Ethnicity Dropdown */}
          <select
            name="ethnicity"
            value={form.ethnicity}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select Ethnicity</option>
            <option value="asian">Asian</option>
            <option value="black">Black / African</option>
            <option value="hispanic">Hispanic / Latino</option>
            <option value="white">White</option>
            <option value="mixed">Mixed</option>
            <option value="other">Other</option>
            <option value="prefer_not_say">Prefer not to say</option>
          </select>

          {(["country", "state", "cell_number", "skills", "experience", "bio"] as const).map(
            (field) =>
              field === "bio" ? (
                <textarea
                  key={field}
                  name={field}
                  placeholder="Bio"
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
