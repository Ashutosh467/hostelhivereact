import React from "react";

export default function WardenApprovals() {
  return (
    <div className="card">
      <div className="badge">👨‍🏫 Warden Dashboard</div>
      <h2 className="h2">Outpass Approvals (UI)</h2>
      <p className="p">Backend will show pending requests here.</p>

      <div className="hr" />

      <div className="card" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="badge">Sample Request</div>
        <p className="p">
          <b>Student:</b> Ashutosh • Floor 3
        </p>
        <p className="small">Time: 17:00 - 21:00 • Destination: Market</p>
        <div className="row">
          <button className="btn btn-primary">Approve</button>
          <button className="btn">Reject</button>
        </div>
      </div>
    </div>
  );
}
