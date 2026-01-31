import React, { useState } from "react";

export default function GuardScan() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  return (
    <div className="card">
      <div className="badge">👮 Security Guard</div>
      <h2 className="h2">FAST SCAN MODE (UI)</h2>
      <p className="p">Prototype only (beep green/red concept)</p>

      <div className="hr" />

      <input
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Scan QR / Enter Pass ID"
      />

      <div className="hr" />

      <div className="row">
        <button
          className="btn btn-primary"
          onClick={() => setResult("✅ GREEN + BEEP (Allowed)")}
        >
          Scan
        </button>
        <button
          className="btn"
          onClick={() => setResult("❌ RED + BEEP (Denied/Expired)")}
        >
          Test Deny
        </button>
      </div>

      {result && (
        <>
          <div className="hr" />
          <div className="badge">{result}</div>
        </>
      )}
    </div>
  );
}
