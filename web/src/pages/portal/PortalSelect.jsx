import React from "react";
import { useNavigate } from "react-router-dom";

export default function PortalSelect() {
  const nav = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div style={{ width: "100%", maxWidth: 900 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 6 }}>
          HostelHive
        </h1>
        <p style={{ color: "#475569", marginBottom: 18 }}>
          Smart Hostel Automation + Security + Operations Ecosystem
        </p>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
        >
          {/* Student */}
          <div
            style={{
              background: "white",
              borderRadius: 18,
              padding: 18,
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 800 }}>Student Portal</h2>
            <p style={{ color: "#64748b", marginTop: 6 }}>
              Outpass, Mess, Gym, Complaints, Visitor Pass, Lost & Found,
              Chatbot
            </p>

            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button
                onClick={() => nav("/student/login")}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "none",
                  background: "black",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                Login
              </button>
              <button
                onClick={() => nav("/student/signup")}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "1px solid #cbd5e1",
                  background: "white",
                  fontWeight: 700,
                }}
              >
                Signup
              </button>
            </div>
          </div>

          {/* Admin */}
          <div
            style={{
              background: "white",
              borderRadius: 18,
              padding: 18,
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 800 }}>
              Admin / Staff Portal
            </h2>
            <p style={{ color: "#64748b", marginTop: 6 }}>
              Warden, Guard, Mess Head, Gym Head, Hospital Desk, Head Warden
            </p>

            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button
                onClick={() => nav("/admin/login")}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "none",
                  background: "black",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                Login
              </button>
              <button
                onClick={() => nav("/admin/signup")}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "1px solid #cbd5e1",
                  background: "white",
                  fontWeight: 700,
                }}
              >
                Signup
              </button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 14, color: "#64748b", fontSize: 13 }}>
          Note: Outpass module is fully working (Student → Warden → Guard). बाकी
          modules अभी placeholder हैं।
        </div>
      </div>
    </div>
  );
}
