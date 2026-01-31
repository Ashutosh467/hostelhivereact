import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/temp";
import { saveSession } from "../../utils/auth";

export default function AdminLogin() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const data = await login(userId.trim(), password.trim());
      saveSession(data);

      // staff/admin roles allowed
      const role = data.user.role;

      if (role === "WARDEN") nav("/staff/warden");
      else if (role === "GUARD") nav("/staff/guard");
      else nav("/admin/dashboard");
    } catch (err) {
      setMsg("❌ " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold">Admin / Staff Login</h1>
        <p className="text-slate-500 text-sm mt-1">
          Warden, Guard, Mess Head, Gym Head etc.
        </p>

        <form className="mt-5 space-y-3" onSubmit={handleLogin}>
          <input
            className="w-full border rounded-xl p-3"
            placeholder="Staff User ID"
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

          <button className="w-full bg-black text-white rounded-xl p-3 font-semibold">
            Login
          </button>
        </form>

        <div className="mt-4 text-sm text-slate-600">
          New Staff?{" "}
          <Link to="/admin/signup" className="text-blue-600 font-semibold">
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
