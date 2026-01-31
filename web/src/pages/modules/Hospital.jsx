import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hospital() {
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
        <h1 style={{ fontSize: 22, fontWeight: 900 }}>Hospital Module</h1>
        <p style={{ color: "#64748b", marginTop: 6 }}>
          Coming Soon: Appointment + emergency request + health record
        </p>

        <button
          onClick={() => nav("/student/dashboard")}
          style={{
            marginTop: 14,
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid #cbd5e1",
            background: "white",
            fontWeight: 800,
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
