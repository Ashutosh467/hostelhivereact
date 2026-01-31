import React from "react";

export default function MyPass() {
  return (
    <div className="card">
      <div className="badge">🧾 My QR Pass</div>
      <h2 className="h2">Outpass QR (UI Prototype)</h2>
      <p className="p">
        In real version: dynamic QR + 2 scans (OUT then IN) only
      </p>

      <div className="hr" />

      <div className="card" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="badge">QR Preview</div>
        <p className="p">
          <b>PASS-ID:</b> OP-DEMO-12345
        </p>
        <p className="small">
          Valid: 17:00 - 21:00 • 2 scans allowed (OUT then IN)
        </p>
      </div>
    </div>
  );
}
