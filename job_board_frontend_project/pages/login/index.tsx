import { useState } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api"; // Axios instance
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/token/", formData); // Simple JWT login endpoint
      if (res.status === 200) {
        const { access, refresh } = res.data;
        // Save tokens in localStorage (or cookies)
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        alert("Login successful!");
        router.push("/jobs"); // Redirect to jobs page or dashboard
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      alert(error.response?.data?.detail || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center bg-gray-200 p-6 pt-24">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-md p-6 rounded-lg bg-gray-300 shadow space-y-4"
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input"
          />

          <button
            type="submit"
            className={`w-full py-2 rounded font-semibold text-white transition ${
              loading ? "bg-gray-400" : "bg-indigo-400 hover:bg-indigo-600"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
