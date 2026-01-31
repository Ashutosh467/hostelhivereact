import React from "react";
import StatCard from "../components/StatCard";

export default function HeadOverview() {
  return (
    <div className="grid">
      <div className="card">
        <div className="badge">👑 Head Warden</div>
        <h2 className="h2">Hostel Overview (UI)</h2>
        <p className="p">Analytics + AI monthly reports will come here.</p>
      </div>

      <div className="grid grid-3">
        <StatCard title="OUT Today" value="12" subtitle="Students exited" />
        <StatCard title="IN Today" value="9" subtitle="Students returned" />
        <StatCard title="Late Returns" value="3" subtitle="Auto alerts sent" />
      </div>
    </div>
  );
}
