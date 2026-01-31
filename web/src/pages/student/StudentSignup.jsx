import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentSignup() {
  const nav = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !userId.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setMsg("❌ Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setMsg("❌ Password and Confirm Password not matching");
      return;
    }

    // Hackathon Prototype: backend register later
    setMsg(
      "✅ Signup screen ready (Backend register integration will be added next).",
    );
  };

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
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "white",
          borderRadius: 18,
          padding: 18,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>Student Signup</h1>
        <p style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>
          Create a new student account
        </p>

        <form
          onSubmit={submit}
          style={{ marginTop: 14, display: "grid", gap: 10 }}
        >
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            style={{
              padding: 12,
              borderRadius: 12,
              border: "1px solid #cbd5e1",
            }}
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            style={{
              padding: 12,
              borderRadius: 12,
              border: "1px solid #cbd5e1",
            }}
          />
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID (eg: 24BCS123)"
            style={{
              padding: 12,
              borderRadius: 12,
              border: "1px solid #cbd5e1",
            }}
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            style={{
              padding: 12,
              borderRadius: 12,
              border: "1px solid #cbd5e1",
            }}
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type="password"
            style={{
              padding: 12,
              borderRadius: 12,
              border: "1px solid #cbd5e1",
            }}
          />

          <button
            style={{
              padding: 12,
              borderRadius: 12,
              border: "none",
              background: "black",
              color: "white",
              fontWeight: 800,
            }}
          >
            Signup
          </button>
        </form>

        <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
          <button
            onClick={() => nav("/student/login")}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 12,
              border: "1px solid #cbd5e1",
              background: "white",
              fontWeight: 700,
            }}
          >
            Go to Login
          </button>
          <button
            onClick={() => nav("/")}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 12,
              border: "1px solid #cbd5e1",
              background: "white",
              fontWeight: 700,
            }}
          >
            Back
          </button>
        </div>

        {msg && (
          <div
            style={{
              marginTop: 12,
              padding: 10,
              borderRadius: 12,
              background: "#dcfce7",
              color: "#166534",
            }}
          >
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
