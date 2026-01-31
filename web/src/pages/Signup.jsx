import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    setMsg("");

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !userId.trim() ||
      !pass.trim() ||
      !cpass.trim()
    ) {
      setMsg("❌ Please fill all fields");
      return;
    }

    if (pass !== cpass) {
      setMsg("❌ Password & Confirm Password must match");
      return;
    }

    // Dummy signup for now (backend later)
    setMsg("✅ Account created (demo). Now login!");
    setTimeout(() => nav("/login"), 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold">Student Signup</h1>
        <p className="text-slate-500 text-sm mt-1">
          Create your HostelHive student account
        </p>

        <form className="mt-5 space-y-3" onSubmit={handleSignup}>
          <div className="flex gap-2">
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
          </div>

          <input
            className="w-full border rounded-xl p-3"
            placeholder="User ID (example: 24BCS999)"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Password"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Confirm Password"
            type="password"
            value={cpass}
            onChange={(e) => setCpass(e.target.value)}
          />

          <button className="w-full bg-black text-white rounded-xl p-3 font-semibold">
            Signup
          </button>
        </form>

        <div className="mt-4 text-sm text-slate-600">
          Already have account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </div>

        {msg && (
          <div className="mt-4 p-3 rounded-xl bg-slate-100 text-slate-800 text-sm">
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
