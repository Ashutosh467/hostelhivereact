import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";

export default function StudentLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    // ✅ LOGIN SUCCESS (ALL DEVICES)
    nav("/student/dashboard");
  };

  return (
    <div className="card">
      <div className="badge">🎓 Student Portal</div>
      <h2 className="h2">Student Login</h2>

      <input
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
      />

      <div className="hr" />

      <input
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />

      <div className="hr" />

      <button
        className="btn btn-primary"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
