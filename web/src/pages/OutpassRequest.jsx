import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OutpassRequest() {
  const nav = useNavigate();
  const [fromTime, setFromTime] = useState("17:00");
  const [toTime, setToTime] = useState("21:00");

  return (
    <div className="card">
      <div className="badge">🚪 Outpass Request</div>
      <h2 className="h2">Create Outpass (UI)</h2>
      <p className="p">Backend integration will approve and generate QR.</p>

      <div className="hr" />

      <div className="grid grid-2">
        <div>
          <div className="small">From</div>
          <input
            className="input"
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
          />
        </div>
        <div>
          <div className="small">To</div>
          <input
            className="input"
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
          />
        </div>
      </div>

      <div className="hr" />

      <button
        className="btn btn-primary"
        onClick={() => nav("/student/mypass")}
      >
        Submit Request
      </button>
    </div>
  );
}
