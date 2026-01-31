import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MedicalHelp() {
  const nav = useNavigate();

  const [tab, setTab] = useState("home");

  // medical profile
  const [profile, setProfile] = useState({
    bloodGroup: "O+",
    height: "170 cm",
    weight: "65 kg",
    allergies: "None",
  });

  // request form
  const [issue, setIssue] = useState("");
  const [location, setLocation] = useState("Hostel Room");
  const [severity, setSeverity] = useState("HIGH");
  const [doctorType, setDoctorType] = useState("General Physician");

  // saved requests
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("hostelhive_medical_requests");
    if (saved) setRequests(JSON.parse(saved));
  }, []);

  const saveRequests = (list) => {
    setRequests(list);
    localStorage.setItem("hostelhive_medical_requests", JSON.stringify(list));
  };

  const submitEmergency = () => {
    if (!issue.trim()) {
      alert("Please enter your emergency issue.");
      return;
    }

    const newReq = {
      id: "MED-" + Date.now(),
      type: "Emergency Ambulance",
      issue,
      location,
      severity,
      status: "PENDING",
      createdAt: new Date().toLocaleString(),
    };

    const updated = [newReq, ...requests];
    saveRequests(updated);

    alert("✅ Emergency request sent! (Demo: saved locally)");
    setIssue("");
    setTab("tracking");
  };

  const submitDoctorCall = () => {
    if (!issue.trim()) {
      alert("Please enter your issue.");
      return;
    }

    const newReq = {
      id: "DOC-" + Date.now(),
      type: "Doctor On Call",
      issue,
      doctorType,
      status: "PENDING",
      createdAt: new Date().toLocaleString(),
    };

    const updated = [newReq, ...requests];
    saveRequests(updated);

    alert("✅ Doctor on call request sent! (Demo: saved locally)");
    setIssue("");
    setTab("tracking");
  };

  const updateProfile = () => {
    localStorage.setItem("hostelhive_medical_profile", JSON.stringify(profile));
    alert("✅ Medical profile updated (Demo: saved locally)");
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
              Medical Help 🏥
            </h1>
            <p style={{ color: "#64748b", marginTop: 6 }}>
              Emergency request + Doctor on call + Tracking (Student Side Demo)
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
            active={tab === "emergency"}
            onClick={() => setTab("emergency")}
            text="Emergency Ambulance"
          />
          <TabBtn
            active={tab === "doctor"}
            onClick={() => setTab("doctor")}
            text="Doctor On Call"
          />
          <TabBtn
            active={tab === "tracking"}
            onClick={() => setTab("tracking")}
            text="My Requests"
          />
          <TabBtn
            active={tab === "profile"}
            onClick={() => setTab("profile")}
            text="Medical Profile"
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
                title="🚑 Emergency Ambulance Request"
                desc="Send emergency request quickly with location + severity."
                onClick={() => setTab("emergency")}
              />
              <Card
                title="👨‍⚕️ Doctor On Call"
                desc="Request doctor consultation from hostel room."
                onClick={() => setTab("doctor")}
              />
              <Card
                title="📌 My Requests"
                desc="Track all requests (Pending/Approved/Done)."
                onClick={() => setTab("tracking")}
              />
              <Card
                title="🩸 Medical Profile"
                desc="Blood group + height + weight + allergies."
                onClick={() => setTab("profile")}
              />
            </div>
          )}

          {tab === "emergency" && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 900 }}>
                🚑 Emergency Ambulance Request
              </h2>

              <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                <input
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder="What happened? (ex: breathing issue, injury, fever...)"
                  style={inputStyle}
                />

                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location (Hostel, Room no, Block...)"
                  style={inputStyle}
                />

                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  style={inputStyle}
                >
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LOW">LOW</option>
                </select>

                <button onClick={submitEmergency} style={primaryBtn}>
                  Confirm & Send Emergency Request
                </button>
              </div>

              <p style={{ marginTop: 10, color: "#64748b", fontSize: 13 }}>
                Demo: request will be stored locally. Later we will connect to
                Hospital/Head Warden dashboard.
              </p>
            </div>
          )}

          {tab === "doctor" && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 900 }}>
                👨‍⚕️ Doctor On Call
              </h2>

              <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                <input
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder="Describe your issue (ex: headache, stomach pain...)"
                  style={inputStyle}
                />

                <select
                  value={doctorType}
                  onChange={(e) => setDoctorType(e.target.value)}
                  style={inputStyle}
                >
                  <option>General Physician</option>
                  <option>Orthopedic</option>
                  <option>Skin Specialist</option>
                  <option>ENT</option>
                </select>

                <button onClick={submitDoctorCall} style={primaryBtn}>
                  Request Doctor On Call
                </button>
              </div>

              <p style={{ marginTop: 10, color: "#64748b", fontSize: 13 }}>
                Demo: request will be stored locally. Later we’ll assign doctors
                + live status.
              </p>
            </div>
          )}

          {tab === "tracking" && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 900 }}>📌 My Requests</h2>

              {requests.length === 0 ? (
                <p style={{ color: "#64748b", marginTop: 8 }}>
                  No requests yet.
                </p>
              ) : (
                <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                  {requests.map((r) => (
                    <div
                      key={r.id}
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
                          {r.type}{" "}
                          <span style={{ color: "#64748b", fontWeight: 700 }}>
                            ({r.id})
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
                          {r.status}
                        </div>
                      </div>

                      <div style={{ marginTop: 8, color: "#0f172a" }}>
                        <b>Issue:</b> {r.issue}
                      </div>

                      {r.location && (
                        <div style={{ marginTop: 4, color: "#334155" }}>
                          <b>Location:</b> {r.location}
                        </div>
                      )}

                      {r.severity && (
                        <div style={{ marginTop: 4, color: "#334155" }}>
                          <b>Severity:</b> {r.severity}
                        </div>
                      )}

                      {r.doctorType && (
                        <div style={{ marginTop: 4, color: "#334155" }}>
                          <b>Doctor:</b> {r.doctorType}
                        </div>
                      )}

                      <div
                        style={{ marginTop: 8, fontSize: 12, color: "#64748b" }}
                      >
                        Created: {r.createdAt}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "profile" && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 900 }}>
                🩸 Medical Profile
              </h2>

              <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                <input
                  value={profile.bloodGroup}
                  onChange={(e) =>
                    setProfile({ ...profile, bloodGroup: e.target.value })
                  }
                  placeholder="Blood Group (ex: O+)"
                  style={inputStyle}
                />
                <input
                  value={profile.height}
                  onChange={(e) =>
                    setProfile({ ...profile, height: e.target.value })
                  }
                  placeholder="Height (ex: 170 cm)"
                  style={inputStyle}
                />
                <input
                  value={profile.weight}
                  onChange={(e) =>
                    setProfile({ ...profile, weight: e.target.value })
                  }
                  placeholder="Weight (ex: 65 kg)"
                  style={inputStyle}
                />
                <input
                  value={profile.allergies}
                  onChange={(e) =>
                    setProfile({ ...profile, allergies: e.target.value })
                  }
                  placeholder="Allergies (ex: None)"
                  style={inputStyle}
                />

                <button onClick={updateProfile} style={primaryBtn}>
                  Save Profile
                </button>
              </div>

              <p style={{ marginTop: 10, color: "#64748b", fontSize: 13 }}>
                Demo: Profile saved locally. Later backend will auto-send to
                hospital during emergency.
              </p>
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
