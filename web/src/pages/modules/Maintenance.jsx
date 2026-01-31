import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Maintenance() {
  const nav = useNavigate();

  const [tab, setTab] = useState("home");

  // Complaint Form
  const [category, setCategory] = useState("Electricity");
  const [room, setRoom] = useState("");
  const [hostelBlock, setHostelBlock] = useState("A");
  const [priority, setPriority] = useState("MEDIUM");
  const [details, setDetails] = useState("");

  // Saved Complaints
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("hostelhive_maintenance_complaints");
    if (saved) setComplaints(JSON.parse(saved));
  }, []);

  const saveComplaints = (list) => {
    setComplaints(list);
    localStorage.setItem(
      "hostelhive_maintenance_complaints",
      JSON.stringify(list),
    );
  };

  const submitComplaint = () => {
    if (!room.trim() || !details.trim()) {
      alert("❌ Room number and complaint details are required!");
      return;
    }

    const newComplaint = {
      id: "CMP-" + Date.now(),
      category,
      room,
      hostelBlock,
      priority,
      details,
      status: "PENDING",
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };

    const updated = [newComplaint, ...complaints];
    saveComplaints(updated);

    alert("✅ Complaint submitted successfully! (Demo: saved locally)");
    setRoom("");
    setDetails("");
    setPriority("MEDIUM");
    setCategory("Electricity");
    setTab("my");
  };

  const markResolved = (id) => {
    const updated = complaints.map((c) =>
      c.id === id
        ? { ...c, status: "RESOLVED", updatedAt: new Date().toLocaleString() }
        : c,
    );
    saveComplaints(updated);
  };

  const markInProgress = (id) => {
    const updated = complaints.map((c) =>
      c.id === id
        ? {
            ...c,
            status: "IN_PROGRESS",
            updatedAt: new Date().toLocaleString(),
          }
        : c,
    );
    saveComplaints(updated);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: 16 }}>
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          background: "white",
          borderRadius: 18,
          padding: 18,
          boxShadow: "0 10px 30px rgba(2,6,23,0.06)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>
              Maintenance Complaints 🛠️
            </h1>
            <p style={{ color: "#64748b", marginTop: 6 }}>
              Raise complaint → Track status (Student Side Demo)
            </p>
          </div>

          <button
            onClick={() => nav("/student/dashboard")}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid #cbd5e1",
              background: "white",
              fontWeight: 800,
              cursor: "pointer",
              height: 42,
            }}
          >
            ⬅ Back
          </button>
        </div>

        {/* Tabs */}
        <div
          style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}
        >
          <TabBtn
            active={tab === "home"}
            onClick={() => setTab("home")}
            text="Home"
          />
          <TabBtn
            active={tab === "raise"}
            onClick={() => setTab("raise")}
            text="Raise Complaint"
          />
          <TabBtn
            active={tab === "my"}
            onClick={() => setTab("my")}
            text="My Complaints"
          />
        </div>

        {/* Content */}
        <div style={{ marginTop: 16 }}>
          {tab === "home" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 12,
              }}
            >
              <Card
                title="➕ Raise New Complaint"
                desc="Electricity, Water, Plumbing, WiFi, Cleaning etc."
                onClick={() => setTab("raise")}
              />
              <Card
                title="📌 Track Complaints"
                desc="See Pending / In Progress / Resolved status"
                onClick={() => setTab("my")}
              />
              <Card
                title="⚡ Fast Response System"
                desc="Priority based complaints (Low/Medium/High)"
                onClick={() => setTab("raise")}
              />
            </div>
          )}

          {tab === "raise" && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 900 }}>Raise Complaint</h2>

              <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={inputStyle}
                >
                  <option>Electricity</option>
                  <option>Water</option>
                  <option>Plumbing</option>
                  <option>Cleaning</option>
                  <option>WiFi</option>
                  <option>Furniture</option>
                  <option>Other</option>
                </select>

                <select
                  value={hostelBlock}
                  onChange={(e) => setHostelBlock(e.target.value)}
                  style={inputStyle}
                >
                  <option value="A">Hostel Block A</option>
                  <option value="B">Hostel Block B</option>
                  <option value="C">Hostel Block C</option>
                  <option value="D">Hostel Block D</option>
                </select>

                <input
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  placeholder="Room Number (ex: 101)"
                  style={inputStyle}
                />

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  style={inputStyle}
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>

                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Complaint Details (ex: Fan not working, water leakage...)"
                  style={{ ...inputStyle, minHeight: 110, resize: "vertical" }}
                />

                <button onClick={submitComplaint} style={primaryBtn}>
                  Submit Complaint
                </button>
              </div>

              <p style={{ marginTop: 10, color: "#64748b", fontSize: 13 }}>
                Demo: complaint will be stored locally. Later we will connect it
                to Maintenance Head dashboard.
              </p>
            </div>
          )}

          {tab === "my" && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 900 }}>My Complaints</h2>

              {complaints.length === 0 ? (
                <p style={{ color: "#64748b", marginTop: 8 }}>
                  No complaints raised yet.
                </p>
              ) : (
                <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                  {complaints.map((c) => (
                    <div
                      key={c.id}
                      style={{
                        border: "1px solid #e2e8f0",
                        borderRadius: 14,
                        padding: 14,
                        background: "#fff",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 10,
                          flexWrap: "wrap",
                        }}
                      >
                        <div style={{ fontWeight: 900 }}>
                          {c.category}{" "}
                          <span style={{ color: "#64748b", fontWeight: 700 }}>
                            ({c.id})
                          </span>
                        </div>

                        <div
                          style={{
                            padding: "4px 10px",
                            borderRadius: 999,
                            border: "1px solid #cbd5e1",
                            fontSize: 12,
                            fontWeight: 900,
                          }}
                        >
                          {c.status}
                        </div>
                      </div>

                      <div style={{ marginTop: 8, color: "#0f172a" }}>
                        <b>Hostel:</b> {c.hostelBlock} | <b>Room:</b> {c.room}
                      </div>

                      <div style={{ marginTop: 4, color: "#334155" }}>
                        <b>Priority:</b> {c.priority}
                      </div>

                      <div style={{ marginTop: 6, color: "#334155" }}>
                        <b>Details:</b> {c.details}
                      </div>

                      <div
                        style={{ marginTop: 8, fontSize: 12, color: "#64748b" }}
                      >
                        Created: {c.createdAt} <br />
                        Updated: {c.updatedAt}
                      </div>

                      {/* Demo buttons */}
                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                          marginTop: 10,
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          onClick={() => markInProgress(c.id)}
                          style={{
                            padding: "8px 12px",
                            borderRadius: 12,
                            border: "1px solid #cbd5e1",
                            background: "white",
                            fontWeight: 900,
                            cursor: "pointer",
                          }}
                        >
                          Mark In Progress
                        </button>

                        <button
                          onClick={() => markResolved(c.id)}
                          style={{
                            padding: "8px 12px",
                            borderRadius: 12,
                            border: "1px solid #cbd5e1",
                            background: "white",
                            fontWeight: 900,
                            cursor: "pointer",
                          }}
                        >
                          Mark Resolved
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function TabBtn({ active, onClick, text }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 14px",
        borderRadius: 999,
        border: "1px solid #e2e8f0",
        background: active ? "#0f172a" : "white",
        color: active ? "white" : "#0f172a",
        fontWeight: 900,
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
}

function Card({ title, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: "left",
        background: "white",
        borderRadius: 18,
        padding: 16,
        border: "1px solid #e2e8f0",
        cursor: "pointer",
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>
      <div style={{ fontSize: 13, color: "#64748b", marginTop: 6 }}>{desc}</div>
    </button>
  );
}

/* ---------- Styles ---------- */
const inputStyle = {
  width: "100%",
  border: "1px solid #cbd5e1",
  borderRadius: 12,
  padding: 12,
  outline: "none",
};

const primaryBtn = {
  width: "100%",
  background: "#0f172a",
  color: "white",
  border: "none",
  padding: 12,
  borderRadius: 12,
  fontWeight: 900,
  cursor: "pointer",
};
