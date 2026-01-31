import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/temp";
import { saveSession } from "../../utils/auth";

export default function StudentLogin() {
  const nav = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!userId.trim() || !password.trim()) {
      setMsg("❌ Please enter User ID and Password both");
      return;
    }

    setLoading(true);
    try {
      const data = await login(userId.trim(), password.trim());
      saveSession(data);

      if (data.user.role !== "STUDENT") {
        setMsg("❌ This is Student Login. Please use Admin Login.");
        return;
      }

      nav("/student/dashboard");
    } catch (err) {
      setMsg("❌ " + err.message);
    } finally {
      setLoading(false);
    }
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
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>Student Login</h1>
        <p style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>
          Enter User ID + Password
        </p>

        <form
          onSubmit={submit}
          style={{ marginTop: 14, display: "grid", gap: 10 }}
        >
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID (eg: 24BCS001)"
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

          <button
            disabled={loading}
            style={{
              padding: 12,
              borderRadius: 12,
              border: "none",
              background: "black",
              color: "white",
              fontWeight: 800,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
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
          <button
            onClick={() => nav("/student/signup")}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 12,
              border: "1px solid #cbd5e1",
              background: "white",
              fontWeight: 700,
            }}
          >
            Signup
          </button>
        </div>

        {msg && (
          <div
            style={{
              marginTop: 12,
              padding: 10,
              borderRadius: 12,
              background: "#fee2e2",
              color: "#991b1b",
            }}
          >
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
