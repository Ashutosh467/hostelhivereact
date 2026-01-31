import React from "react";

export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="card">
      <div className="badge">{title}</div>
      <div className="kpi">{value}</div>
      <div className="small">{subtitle}</div>
    </div>
  );
}
