import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="grid">
      <div className="card">
        <div className="badge">🐝 HostelHive</div>
        <h1 className="h1">SmartHostel Web Prototype</h1>
        <p className="p">
          Role-based dashboards + Outpass QR flow + Mess AI + Gym AI + ChatBot
          (UI Prototype)
        </p>
        <div className="hr" />
        <div className="row">
          <Link className="btn btn-primary" to="/student/login">
            🎓 Student Portal
          </Link>
          <Link className="btn btn-primary" to="/staff/login">
            🛡️ Staff & Head Portal
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="badge">Prototype Note</div>
        <p className="p">
          This is a UI prototype. Backend integration will be added later.
        </p>
      </div>
    </div>
  );
}
