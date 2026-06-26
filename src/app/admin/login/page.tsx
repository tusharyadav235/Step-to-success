"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "@phosphor-icons/react/dist/ssr";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';

    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      
      if (res.ok && data.token) {
        localStorage.setItem("adminToken", data.token);
        router.push("/admin");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Failed to connect to backend server");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-primary/5">
        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
          <Lock size={32} weight="fill" />
        </div>
        <h1 className="text-3xl font-display font-bold text-center text-primary mb-2">Admin Login</h1>
        <p className="text-primary/60 text-center mb-8 text-sm">Secure dashboard access.</p>
        
        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm text-center border border-red-100">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-primary/10 bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-primary/10 bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 bg-primary text-white rounded-xl font-bold tracking-wide hover:bg-accent transition-colors duration-300 disabled:opacity-50 mt-4 shadow-lg shadow-primary/20"
          >
            {isLoading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
