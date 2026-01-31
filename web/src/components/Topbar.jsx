import React from "react";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="row">
        <Link to="/" className="badge">
          🐝 <b>HostelHive</b> <span className="small">Prototype</span>
        </Link>
      </div>

      <div className="row">
        <Link className="btn" to="/">
          Home
        </Link>
        <Link className="btn" to="/student/login">
          Student
        </Link>
        <Link className="btn" to="/staff/login">
          Staff
        </Link>
      </div>
    </div>
  );
}
