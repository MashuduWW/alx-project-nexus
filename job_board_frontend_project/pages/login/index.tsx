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
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <h1 className="page-title">Login</h1>

        <form onSubmit={handleSubmit} className="form-card">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="form-input"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="form-input"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`btn ${loading ? "btn-disabled" : "btn-primary"}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && <pre className="form-message">{message}</pre>}
      </main>
      <Footer />
    </div>
  );
}
