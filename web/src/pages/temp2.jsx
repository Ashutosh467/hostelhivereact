import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE } from "../config/api";

export default function Signup() {
  const nav = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState(""); // can be email
  const [role, setRole] = useState("STUDENT");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!firstName.trim() || !lastName.trim())
      return setMsg("❌ Enter first & last name");
    if (!userId.trim()) return setMsg("❌ Enter User ID / Email");
    if (password.length < 6) return setMsg("❌ Password must be 6+ chars");
    if (password !== confirm)
      return setMsg("❌ Password & Confirm Password not matching");

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName.trim()} ${lastName.trim()}`,
          userId: userId.trim(),
          password,
          role,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      setMsg("✅ Account created! Now login.");
      setTimeout(() => nav("/login"), 800);
    } catch (e2) {
      setMsg("❌ " + e2.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-slate-500 text-sm mt-1">
          Student + Staff both can signup
        </p>

        <form className="mt-5 space-y-3" onSubmit={submit}>
          <div className="grid grid-cols-2 gap-3">
            <input
              className="border rounded-xl p-3"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="border rounded-xl p-3"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            className="w-full border rounded-xl p-3"
            placeholder="User ID / Email"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <select
            className="w-full border rounded-xl p-3"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="STUDENT">Student</option>
            <option value="WARDEN">Warden</option>
            <option value="GUARD">Guard</option>
          </select>

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Password (min 6 chars)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="w-full border rounded-xl p-3"
            placeholder="Confirm Password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white rounded-xl p-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-sm text-slate-600">
          Already have account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </div>

        {msg && (
          <div className="mt-4 p-3 rounded-xl bg-slate-100 text-sm">{msg}</div>
        )}
      </div>
    </div>
  );
}
