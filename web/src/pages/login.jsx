import React, { useState } from "react";
import { login } from "../services/authService";
import { saveSession } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleLogin = async (e) => {
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

      const role = data.user.role;

      if (role === "STUDENT") nav("/student/dashboard");
      else if (role === "WARDEN") nav("/staff/warden");
      else if (role === "GUARD") nav("/staff/guard");
      else nav("/login");
    } catch (err) {
      setMsg("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold">HostelHive Login</h1>

        <form className="mt-5 space-y-3" onSubmit={handleLogin}>
          <input
            className="w-full border rounded-xl p-3"
            placeholder="User ID (example: 24BCS001)"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white rounded-xl p-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-sm text-slate-600">
          New here?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Create account
          </Link>
        </div>

        {msg && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm">
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
