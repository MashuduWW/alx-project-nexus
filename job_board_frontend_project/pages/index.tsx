import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>HireSpot-Frontend</title>
      </Head>

      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative bg-gray-500 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to HireSpot
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Your go-to platform for discovering the latest job opportunities. 
              Whether you’re a jobseeker or a recruiter, we make the process simple and efficient.
            </p>

            <div className="flex justify-center space-x-4">
              <Link
                href="/jobs"
                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-md font-semibold hover:bg-indigo-400 transition"
              >
                Browse Jobs
              </Link>
              <Link
                href="/companies"
                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-md font-semibold hover:bg-indigo-400 transition"
              >
                Browse Companies
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Why Choose HireSpot?
            </h2>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6 bg-gray-300 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">For Job Seekers</h3>
                <p className="text-gray-600">
                  Explore thousands of jobs tailored to your skills and interests. Apply in just a few clicks.
                </p>
              </div>
              <div className="p-6 bg-gray-300 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">For Recruiters</h3>
                <p className="text-gray-600">
                  Post jobs, manage applications, and connect with top talent easily and effectively.
                </p>
              </div>
              <div className="p-6 bg-gray-300 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">Fast & Secure</h3>
                <p className="text-gray-600">
                  Enjoy a seamless hiring process with modern tools, JWT authentication, and secure APIs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gray-100 text-gray-900 py-12 text-center">
          <h4 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to elevate your career or find the perfect candidate? <br />
            Join HireSpot today!
          </h4>
        </section>
      </main>

      <Footer />
    </div>
  );
}
