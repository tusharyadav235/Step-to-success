"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [pathname, router]);

  if (isLoading) return <div className="h-screen w-screen flex items-center justify-center bg-background">Loading...</div>;
  if (!isAuthenticated && pathname !== "/admin/login") return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {pathname !== "/admin/login" && (
        <nav className="bg-primary text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow-md">
          <div className="font-display font-bold text-xl">Admin Panel</div>
          <button 
            onClick={() => {
              localStorage.removeItem("adminToken");
              router.push("/admin/login");
            }}
            className="px-4 py-2 bg-white/10 hover:bg-accent rounded-lg transition-colors text-sm font-medium"
          >
            Logout
          </button>
        </nav>
      )}
      <main className="p-6">{children}</main>
    </div>
  );
}
