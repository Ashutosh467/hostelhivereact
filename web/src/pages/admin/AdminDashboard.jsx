import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const nav = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: 16 }}>
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "white",
          borderRadius: 18,
          padding: 18,
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 900 }}>Admin Dashboard</h1>
        <p style={{ color: "#64748b", marginTop: 6 }}>
          Staff modules will be connected later.
        </p>

        <div
          style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}
        >
          <button
            onClick={() => nav("/staff/warden")}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid #cbd5e1",
              background: "white",
              fontWeight: 800,
            }}
          >
            Open Warden Dashboard
          </button>

          <button
            onClick={() => nav("/staff/guard")}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid #cbd5e1",
              background: "white",
              fontWeight: 800,
            }}
          >
            Open Guard Dashboard
          </button>
        </div>

        <button
          onClick={() => nav("/admin/login")}
          style={{
            marginTop: 18,
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid #cbd5e1",
            background: "white",
            fontWeight: 800,
          }}
        >
          Back to Admin Login
        </button>
      </div>
    </div>
  );
}
