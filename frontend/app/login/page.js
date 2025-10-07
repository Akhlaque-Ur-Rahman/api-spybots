"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Lock,Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Redirect if user already logged in
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) router.push("/dashboard");
  }, [router]);

  // ✅ Login Handler (no logic changed)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (rememberMe) {
          localStorage.setItem("token", data.token);
        } else {
          sessionStorage.setItem("token", data.token);
        }
        toast.success("Login successful!", { autoClose: 2000 });
        setTimeout(() => router.push("/dashboard"), 2000);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/svg/login-bg.svg')", // 👈 Your SVG from public folder
        backgroundColor: "#0f172a", // fallback dark tone
      }}
    >

      <div>
        <h1 className="text-4xl font-bold mb-6 text-black text-center tracking-wide">
           Login
        </h1>
        <div className="flex justify-center items-center w-full bg-white py-4 rounded-tl-3xl rounded-tr-3xl mb-6">
          <Image
          src="/logo/spybots-logo.jpg"
          alt="Company Logo"
          width={100}
          height={100}
          className=" shadow-md"
        />
        </div>
        <form
        onSubmit={handleLogin}
        className="relative z-10 px-10 pt-0 pb-10 rounded-3xl shadow-2xl w-full max-w-md flex flex-col items-center transition hover:shadow-3xl"
      >
        {/* Logo */}
        

        

        {/* Username */}
        <div className="w-full mb-4 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black">
            <User size={22} />
          </span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full pl-12 p-3 rounded-xl border border-white/30 focus:border-blue-400 outline-none shadow-sm transition bg-white/20 text-gray-600 placeholder-gray-400 "
          />
        </div>

        {/* Password */}
        <div className="w-full mb-4 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black">
            <Lock size={20} />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-12 pr-10 p-3 rounded-xl border border-white/30 focus:border-blue-400 outline-none shadow-sm transition bg-white/10 text-gray-600 placeholder-gray-400"
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {/* Remember Me + Forgot Password */}
        <div className="w-full flex items-center justify-between mb-6 text-sm text-gray-700">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2 w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
            />
            Remember me
          </label>
          <a
            href="/forgot-password"
            className="text-blue-500 hover:text-blue-600 hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        {/* Login Button with Loader */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-xl font-medium text-white flex items-center justify-center transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-400 text-sm mt-6">
          © {new Date().getFullYear()} SpyBots Admin Panel
        </p>
      </form>
      </div>
      {/* Login Card */}
      

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}
