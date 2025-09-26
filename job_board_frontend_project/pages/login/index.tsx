"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { LoginForm } from "../../interfaces/Login";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const response = await api.post("/api/token/", form);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      setMessage("✅ Login successful!");
      router.push("/");
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
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-gray-300 shadow-md rounded-lg p-8 space-y-4"
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
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
