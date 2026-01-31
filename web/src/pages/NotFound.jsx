import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="card">
      <div className="badge">404</div>
      <h2 className="h2">Page Not Found</h2>
      <p className="p">Go back to home.</p>
      <Link className="btn btn-primary" to="/">
        Home
      </Link>
    </div>
  );
}
