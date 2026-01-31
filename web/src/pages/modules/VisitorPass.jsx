import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VisitorPass() {
  const nav = useNavigate();

  // Form fields
  const [visitorName, setVisitorName] = useState("");
  const [relation, setRelation] = useState("Parent");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("Meeting");
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [note, setNote] = useState("");

  // Saved passes
  const [passes, setPasses] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("hostelhive_visitor_passes");
    if (saved) setPasses(JSON.parse(saved));
  }, []);

  const savePasses = (list) => {
    setPasses(list);
    localStorage.setItem("hostelhive_visitor_passes", JSON.stringify(list));
  };

  const todayStr = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const generatePassCode = () => {
    // Simple unique code
    return "VP-" + Date.now().toString().slice(-6);
  };

  const handleCreatePass = () => {
    if (!visitorName.trim()) return alert("❌ Visitor name required");
    if (!phone.trim()) return alert("❌ Visitor phone required");
    if (!date) return alert("❌ Date required");
    if (!fromTime) return alert("❌ From time required");
    if (!toTime) return alert("❌ To time required");

    // Time validation
    const from = new Date(`${date}T${fromTime}:00`);
    const to = new Date(`${date}T${toTime}:00`);
    if (to <= from) return alert("❌ To Time must be greater than From Time");

    const newPass = {
      id: generatePassCode(),
      visitorName: visitorName.trim(),
      relation,
      phone: phone.trim(),
      purpose,
      date,
      fromTime,
      toTime,
      note: note.trim(),
      status: "ACTIVE",
      createdAt: new Date().toLocaleString(),
    };

    const updated = [newPass, ...passes];
    savePasses(updated);

    alert("✅ Visitor Pass Created! (Demo: stored locally)");
    setVisitorName("");
    setPhone("");
    setPurpose("Meeting");
    setRelation("Parent");
    setDate("");
    setFromTime("");
    setToTime("");
    setNote("");
  };

  const expirePass = (id) => {
    const updated = passes.map((p) =>
      p.id === id ? { ...p, status: "EXPIRED" } : p,
    );
    savePasses(updated);
  };

  const deletePass = (id) => {
    const updated = passes.filter((p) => p.id !== id);
    savePasses(updated);
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
              Visitor Pass 🪪
            </h1>
            <p style={{ color: "#64748b", marginTop: 6 }}>
              Create a visitor entry pass (Student Side Demo)
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

        {/* Layout */}
        <div
          style={{
            marginTop: 14,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
        >
          {/* Create Pass */}
          <div
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: 16,
              padding: 14,
              background: "#fff",
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 900, marginTop: 0 }}>
              Create Visitor Pass
            </h2>

            <div style={{ display: "grid", gap: 10 }}>
              <input
                style={inputStyle}
                placeholder="Visitor Name"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
              />

              <select
                style={inputStyle}
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
              >
                <option>Parent</option>
                <option>Guardian</option>
                <option>Relative</option>
                <option>Friend</option>
                <option>Other</option>
              </select>

              <input
                style={inputStyle}
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <select
                style={inputStyle}
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              >
                <option>Meeting</option>
                <option>Document Delivery</option>
                <option>Emergency</option>
                <option>Other</option>
              </select>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <div>
                  <div style={labelStyle}>Date</div>
                  <input
                    type="date"
                    min={todayStr}
                    style={inputStyle}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div>
                  <div style={labelStyle}>From Time</div>
                  <input
                    type="time"
                    style={inputStyle}
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <div>
                  <div style={labelStyle}>To Time</div>
                  <input
                    type="time"
                    style={inputStyle}
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                  />
                </div>

                <div>
                  <div style={labelStyle}>Note (optional)</div>
                  <input
                    style={inputStyle}
                    placeholder="ex: Carrying documents"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>

              <button onClick={handleCreatePass} style={primaryBtn}>
                Create Pass
              </button>
            </div>

            <p style={{ marginTop: 10, color: "#64748b", fontSize: 13 }}>
              Demo: Pass is stored locally. Later we will send it to
              Security/Reception.
            </p>
          </div>

          {/* Pass List */}
          <div
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: 16,
              padding: 14,
              background: "#fff",
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 900, marginTop: 0 }}>
              My Visitor Passes
            </h2>

            {passes.length === 0 ? (
              <p style={{ color: "#64748b" }}>No visitor passes created yet.</p>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {passes.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: 14,
                      padding: 12,
                      background: "#f8fafc",
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
                        {p.visitorName}{" "}
                        <span style={{ color: "#64748b", fontWeight: 800 }}>
                          ({p.id})
                        </span>
                      </div>

                      <div
                        style={{
                          padding: "4px 10px",
                          borderRadius: 999,
                          border: "1px solid #cbd5e1",
                          fontSize: 12,
                          fontWeight: 900,
                          background: "white",
                        }}
                      >
                        {p.status}
                      </div>
                    </div>

                    <div
                      style={{ marginTop: 6, color: "#0f172a", fontSize: 14 }}
                    >
                      <b>Relation:</b> {p.relation} | <b>Phone:</b> {p.phone}
                    </div>

                    <div
                      style={{ marginTop: 4, color: "#334155", fontSize: 14 }}
                    >
                      <b>Purpose:</b> {p.purpose}
                    </div>

                    <div
                      style={{ marginTop: 4, color: "#334155", fontSize: 14 }}
                    >
                      <b>Date:</b> {p.date} | <b>Time:</b> {p.fromTime} →{" "}
                      {p.toTime}
                    </div>

                    {p.note ? (
                      <div
                        style={{ marginTop: 4, color: "#334155", fontSize: 14 }}
                      >
                        <b>Note:</b> {p.note}
                      </div>
                    ) : null}

                    <div
                      style={{ marginTop: 8, fontSize: 12, color: "#64748b" }}
                    >
                      Created: {p.createdAt}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        marginTop: 10,
                        flexWrap: "wrap",
                      }}
                    >
                      <button
                        onClick={() => expirePass(p.id)}
                        style={secondaryBtn}
                      >
                        Expire
                      </button>

                      <button
                        onClick={() => deletePass(p.id)}
                        style={dangerBtn}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Small Note */}
        <div style={{ marginTop: 14, fontSize: 13, color: "#64748b" }}>
          ✅ Next upgrade: Generate QR + send to Guard dashboard for
          verification.
        </div>
      </div>
    </div>
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

const labelStyle = {
  fontSize: 12,
  fontWeight: 900,
  color: "#334155",
  marginBottom: 6,
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

const secondaryBtn = {
  padding: "8px 12px",
  borderRadius: 12,
  border: "1px solid #cbd5e1",
  background: "white",
  fontWeight: 900,
  cursor: "pointer",
};

const dangerBtn = {
  padding: "8px 12px",
  borderRadius: 12,
  border: "1px solid #fecaca",
  background: "#fff1f2",
  fontWeight: 900,
  cursor: "pointer",
};
