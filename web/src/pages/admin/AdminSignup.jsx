import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!firstName || !lastName || !userId || !password || !confirmPassword) {
      setMsg("❌ Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setMsg("❌ Password & Confirm Password must match");
      return;
    }

    // For now dummy (backend add later)
    setMsg("✅ Staff account created (Demo). Now login.");
    setTimeout(() => nav("/admin/login"), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold">Admin / Staff Signup</h1>
        <p className="text-slate-500 text-sm mt-1">
          Create staff account (demo now, backend later)
        </p>

        <form className="mt-5 space-y-3" onSubmit={handleSignup}>
          <input
            className="w-full border rounded-xl p-3"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="w-full border rounded-xl p-3"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <input
            className="w-full border rounded-xl p-3"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="w-full bg-black text-white rounded-xl p-3 font-semibold">
            Signup
          </button>
        </form>

        <div className="mt-4 text-sm text-slate-600">
          Already have account?{" "}
          <Link to="/admin/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </div>

        {msg && (
          <div className="mt-4 p-3 rounded-xl bg-green-50 text-green-700 text-sm">
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
