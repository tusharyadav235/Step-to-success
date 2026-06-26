"use client";

import { useState, useEffect } from "react";
import { Users, Image, Envelope, Upload, Trash, Plus } from "@phosphor-icons/react/dist/ssr";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("gallery");
  const [data, setData] = useState({ gallery: [], students: [], applications: [] });
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';

  const fetchAuth = (url: string, options: any = {}) => {
    const token = localStorage.getItem("adminToken");
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "Authorization": `Bearer ${token}`
      }
    });
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [galRes, stuRes, appRes] = await Promise.all([
        fetchAuth(`${apiUrl}/api/gallery`),
        fetchAuth(`${apiUrl}/api/students`),
        fetchAuth(`${apiUrl}/api/applications`)
      ]);
      const gallery = await galRes.json();
      const students = await stuRes.json();
      const applications = await appRes.json();
      setData({ gallery, students, applications });
    } catch (e) {
      console.error("Error fetching admin data", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (type: string, id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await fetchAuth(`${apiUrl}/api/${type}/${id}`, { method: "DELETE" });
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetchAuth(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData,
        // Don't set Content-Type header manually for FormData, browser does it with boundary
        headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
      });
      const data = await res.json();
      return data.url;
    } catch (e) {
      console.error(e);
      alert("File upload failed");
      return null;
    }
  };

  const handleAddGallery = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e: any) => {
      const url = await handleFileUpload(e);
      if (url) {
        const altText = prompt("Enter alt text for image (optional):") || "Gallery Image";
        await fetchAuth(`${apiUrl}/api/gallery`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl: url, altText })
        });
        loadData();
      }
    };
    fileInput.click();
  };

  const handleAddStudent = async () => {
    const name = prompt("Student Name:");
    if (!name) return;
    const achievementTitle = prompt("Achievement Title:");
    if (!achievementTitle) return;
    const description = prompt("Description:");
    
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e: any) => {
      const url = await handleFileUpload(e);
      if (url) {
        await fetchAuth(`${apiUrl}/api/students`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, achievementTitle, description, imageUrl: url })
        });
        loadData();
      }
    };
    fileInput.click();
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white rounded-2xl shadow-sm border border-primary/5 p-4 h-fit">
        <nav className="space-y-2">
          <button onClick={() => setActiveTab("gallery")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "gallery" ? "bg-accent/10 text-accent font-bold" : "hover:bg-primary/5 text-primary/70"}`}>
            <Image size={20} /> Gallery
          </button>
          <button onClick={() => setActiveTab("students")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "students" ? "bg-accent/10 text-accent font-bold" : "hover:bg-primary/5 text-primary/70"}`}>
            <Users size={20} /> Star Students
          </button>
          <button onClick={() => setActiveTab("applications")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "applications" ? "bg-accent/10 text-accent font-bold" : "hover:bg-primary/5 text-primary/70"}`}>
            <Envelope size={20} /> Applications
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-primary/5 p-8 min-h-[500px]">
        {loading ? (
          <div className="flex justify-center items-center h-full text-primary/50">Loading data...</div>
        ) : (
          <>
            {activeTab === "gallery" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-display font-bold text-primary">Gallery Images</h2>
                  <button onClick={handleAddGallery} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors">
                    <Plus size={16} /> Add Image
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {data.gallery.map((img: any) => (
                    <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square border border-primary/10">
                      <img src={img.imageUrl} alt={img.altText} className="w-full h-full object-cover" />
                      <button onClick={() => handleDelete("gallery", img.id)} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                  {data.gallery.length === 0 && <p className="text-primary/50 col-span-3 text-center py-10">No images found.</p>}
                </div>
              </div>
            )}

            {activeTab === "students" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-display font-bold text-primary">Star Students</h2>
                  <button onClick={handleAddStudent} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors">
                    <Plus size={16} /> Add Student
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.students.map((stu: any) => (
                    <div key={stu.id} className="flex gap-4 p-4 border border-primary/10 rounded-xl items-center relative group">
                      <img src={stu.imageUrl} alt={stu.name} className="w-16 h-16 rounded-full object-cover" />
                      <div>
                        <h3 className="font-bold text-primary">{stu.name}</h3>
                        <p className="text-sm text-accent">{stu.achievementTitle}</p>
                      </div>
                      <button onClick={() => handleDelete("students", stu.id)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 p-2 rounded-lg">
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                  {data.students.length === 0 && <p className="text-primary/50 col-span-2 text-center py-10">No students found.</p>}
                </div>
              </div>
            )}

            {activeTab === "applications" && (
              <div>
                <h2 className="text-2xl font-display font-bold text-primary mb-6">Contact Applications</h2>
                <div className="space-y-4">
                  {data.applications.map((app: any) => (
                    <div key={app.id} className="p-5 border border-primary/10 rounded-xl bg-[#FAFAFA]">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-primary text-lg">{app.fullName}</h3>
                          <div className="flex gap-4 text-sm text-primary/60 mt-1">
                            <span>{app.email}</span>
                            <span>{app.phone}</span>
                          </div>
                        </div>
                        <span className="text-xs text-primary/40">
                          {new Date(app.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-primary/80 mt-3 text-sm bg-white p-3 rounded-lg border border-primary/5">{app.message || "No message provided."}</p>
                    </div>
                  ))}
                  {data.applications.length === 0 && <p className="text-primary/50 text-center py-10">No applications found.</p>}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
