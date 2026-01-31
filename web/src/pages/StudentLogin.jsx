import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentLogin() {
  const nav = useNavigate();
  const [id, setId] = useState("");

  return (
    <div className="card">
      <div className="badge">🎓 Student Portal</div>
      <h2 className="h2">Login (UI Only)</h2>
      <p className="p">Prototype login: click Login to open dashboard</p>
      <div className="hr" />
      <input
        className="input"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Student ID / Phone"
      />
      <div className="hr" />
      <button
        className="btn btn-primary"
        onClick={() => nav("/student/dashboard")}
      >
        Login
      </button>
    </div>
  );
}
