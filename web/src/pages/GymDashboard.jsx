import React from "react";

export default function GymDashboard() {
  return (
    <div className="card">
      <div className="badge">🏋️ Gym Dashboard</div>
      <h2 className="h2">AI Slot Suggestions (UI)</h2>
      <p className="p">Shows 2–3 available time slots to reduce crowd.</p>

      <div className="hr" />

      <div className="grid grid-3">
        <div className="card">
          <div className="badge">06:00-07:00</div>
          <div className="small">Seats left: 12</div>
        </div>
        <div className="card">
          <div className="badge">07:00-08:00</div>
          <div className="small">Seats left: 6</div>
        </div>
        <div className="card">
          <div className="badge">18:00-19:00</div>
          <div className="small">Seats left: 3</div>
        </div>
      </div>
    </div>
  );
}
