import React from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const nav = useNavigate();

  const modules = [
    {
      title: "Outpass",
      desc: "Create request → Get QR/Code",
      icon: "🛂",
      path: "/student/outpass",
    },

    {
      title: "Mess",
      desc: "Menu + AI wastage report (Coming Soon)",
      icon: "🍱",
      path: "/student/mess",
    },

    {
      title: "Gym Registration",
      desc: "Slot booking + QR attendance (Coming Soon)",
      icon: "🏋️",
      path: "/student/gym",
    },

    {
      title: "Sports",
      desc: "Events + match updates (Coming Soon)",
      icon: "🏏",
      path: "/student/sports",
    },

    // ✅ FIXED PATH (exists)
    {
      title: "Food Rating + Complaint",
      desc: "Rate food + raise issue",
      icon: "🍽️⭐",
      path: "/student/mess",
    },

    // ✅ FIXED PATH (exists)
    {
      title: "Complaint Tracking",
      desc: "Track all raised complaints",
      icon: "📌📊",
      path: "/student/maintenance",
    },

    // ✅ FIXED PATH (exists)
    {
      title: "Medical Help",
      desc: "Doctor / emergency support",
      icon: "🏥💊",
      path: "/student/medical-help",
    },

    {
      title: "Maintenance",
      desc: "Raise hostel maintenance request",
      icon: "🛠️",
      path: "/student/maintenance",
    },

    {
      title: "Visitor Pass",
      desc: "Generate visitor entry pass",
      icon: "🪪",
      path: "/student/visitor-pass",
    },

    {
      title: "Lost & Found",
      desc: "Report lost items / found items",
      icon: "🔎",
      path: "/student/lost-found",
    },

    {
      title: "AI Chatbot",
      desc: "Ask HostelHive assistant",
      icon: "🤖",
      path: "/student/chatbot",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: 16 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            background: "white",
            borderRadius: 18,
            padding: 18,
            boxShadow: "0 10px 30px rgba(2,6,23,0.06)",
          }}
        >
          <h1 style={{ fontSize: 26, fontWeight: 900, margin: 0 }}>
            Student Dashboard
          </h1>
          <p style={{ color: "#64748b", marginTop: 6 }}>
            Select module to continue
          </p>
        </div>

        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
          }}
        >
          {modules.map((m) => (
            <button
              key={m.title}
              onClick={() => nav(m.path)}
              style={{
                textAlign: "left",
                background: "white",
                borderRadius: 18,
                padding: 16,
                border: "1px solid #e2e8f0",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    background: "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                  }}
                >
                  {m.icon}
                </div>

                <div>
                  <div style={{ fontSize: 16, fontWeight: 900 }}>{m.title}</div>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>
                    {m.desc}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
