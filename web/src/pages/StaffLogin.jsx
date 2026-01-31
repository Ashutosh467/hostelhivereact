import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StaffLogin() {
  const nav = useNavigate();
  const [role, setRole] = useState("WAR");

  return (
    <div className="card">
      <div className="badge">🛡️ Staff & Head Portal</div>
      <h2 className="h2">Login (UI Only)</h2>
      <p className="p">Select role and open dashboard</p>

      <div className="hr" />

      <div className="grid">
        <select
          className="input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="SEC">Security Guard (SEC)</option>
          <option value="WAR">Warden (WAR)</option>
          <option value="HWAR">Head Warden (HWAR)</option>
          <option value="ME">Mess (ME)</option>
          <option value="GY">Gym (GY)</option>
          <option value="MNT">Maintenance (MNT)</option>
          <option value="HOS">Hospital Desk (HOS)</option>
        </select>

        <button
          className="btn btn-primary"
          onClick={() => {
            if (role === "SEC") nav("/staff/guard");
            else if (role === "WAR") nav("/staff/warden");
            else if (role === "HWAR") nav("/staff/head");
            else if (role === "ME") nav("/staff/mess");
            else if (role === "GY") nav("/staff/gym");
            else if (role === "MNT") nav("/staff/maintenance");
            else if (role === "HOS") nav("/staff/hospital");
            else nav("/staff/dashboard");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
