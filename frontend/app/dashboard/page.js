"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Check both localStorage and sessionStorage
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      router.push("/login"); // redirect if no token
    } else {
      setUserToken(token);
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={() => {
            localStorage.removeItem("token");
            sessionStorage.removeItem("token"); // also remove from sessionStorage
            router.push("/login");
          }}
        >
          Logout
        </button>
      </header>

      <main className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Welcome to the Admin Panel!</h2>
        <p>Your JWT token is:</p>
        <pre className="bg-gray-100 p-2 rounded mt-2">{userToken}</pre>
      </main>
    </div>
  );
}
