import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sports() {
  const nav = useNavigate();

  const [activeTab, setActiveTab] = useState("events");
  const [msg, setMsg] = useState("");

  // ✅ Dummy events (today based)
  const todayName = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString("en-US", { weekday: "long" });
  }, []);

  const todaysEvents = useMemo(() => {
    return [
      {
        title: "Cricket Practice",
        time: "05:30 PM - 06:30 PM",
        place: "Ground A",
        coach: "Coach Rahul",
      },
      {
        title: "Badminton",
        time: "06:30 PM - 07:30 PM",
        place: "Indoor Court",
        coach: "Coach Neha",
      },
      {
        title: "Football",
        time: "07:30 PM - 08:30 PM",
        place: "Main Ground",
        coach: "Coach Imran",
      },
    ];
  }, []);

  // ✅ Slot booking (Yes/No)
  const slots = useMemo(() => {
    return [
      { id: "CRICKET", label: "Cricket (Evening)" },
      { id: "FOOTBALL", label: "Football (Evening)" },
      { id: "BADMINTON", label: "Badminton (Indoor)" },
      { id: "VOLLEYBALL", label: "Volleyball" },
    ];
  }, []);

  const [selectedSlot, setSelectedSlot] = useState("CRICKET");
  const [slotAnswer, setSlotAnswer] = useState(null);

  // Save booking locally (demo)
  const saveBooking = () => {
    setMsg("");
    if (!slotAnswer) {
      setMsg("❌ Please choose YES or NO first");
      return;
    }

    const data = {
      slot: selectedSlot,
      answer: slotAnswer,
      time: new Date().toLocaleString(),
    };

    localStorage.setItem("sports_booking", JSON.stringify(data));
    setMsg("✅ Response saved! (This will go to Sports Head later)");
  };

  // Match updates (dummy)
  const matchUpdates = useMemo(() => {
    return [
      {
        match: "Hostel A vs Hostel B (Cricket)",
        status: "LIVE",
        score: "A: 62/2 (8.3)",
      },
      {
        match: "Hostel C vs Hostel D (Football)",
        status: "UPCOMING",
        score: "Starts at 6:30 PM",
      },
      {
        match: "Badminton Doubles",
        status: "FINISHED",
        score: "Winner: Team A",
      },
    ];
  }, []);

  // Complaint form
  const [complaintCategory, setComplaintCategory] = useState("Ground Issue");
  const [complaintText, setComplaintText] = useState("");

  const submitComplaint = () => {
    setMsg("");

    if (!complaintText.trim()) {
      setMsg("❌ Please write complaint details");
      return;
    }

    const payload = {
      category: complaintCategory,
      details: complaintText.trim(),
      createdAt: new Date().toLocaleString(),
    };

    // demo save
    const old = JSON.parse(localStorage.getItem("sports_complaints") || "[]");
    localStorage.setItem(
      "sports_complaints",
      JSON.stringify([payload, ...old]),
    );

    setComplaintText("");
    setMsg("✅ Complaint submitted! (Sports Head will receive it later)");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: 16 }}>
      <div
        style={{
          maxWidth: 950,
          margin: "0 auto",
          background: "white",
          borderRadius: 18,
          padding: 18,
          boxShadow: "0 10px 30px rgba(2,6,23,0.06)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>
              🏏 Sports Module
            </h1>
            <p style={{ color: "#64748b", marginTop: 6 }}>
              {todayName} • Events • Slot Booking • Updates • Complaints
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
          style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}
        >
          <TabBtn
            title="Today’s Events"
            active={activeTab === "events"}
            onClick={() => setActiveTab("events")}
          />
          <TabBtn
            title="Book Sports Slot"
            active={activeTab === "booking"}
            onClick={() => setActiveTab("booking")}
          />
          <TabBtn
            title="Match Updates"
            active={activeTab === "updates"}
            onClick={() => setActiveTab("updates")}
          />
          <TabBtn
            title="Complaint / Issue"
            active={activeTab === "complaint"}
            onClick={() => setActiveTab("complaint")}
          />
        </div>

        {/* Message */}
        {msg && (
          <div
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 14,
              background: msg.includes("❌") ? "#fef2f2" : "#ecfdf5",
              color: msg.includes("❌") ? "#b91c1c" : "#047857",
              fontWeight: 800,
            }}
          >
            {msg}
          </div>
        )}

        {/* Content */}
        <div style={{ marginTop: 14 }}>
          {/* EVENTS */}
          {activeTab === "events" && (
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0 }}>
                📅 Today’s Events
              </h2>
              <p style={{ color: "#64748b", marginTop: 6 }}>
                Practice + matches schedule (dummy)
              </p>

              <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                {todaysEvents.map((e, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: 16,
                      padding: 14,
                      background: "#f8fafc",
                    }}
                  >
                    <div style={{ fontWeight: 900, fontSize: 15 }}>
                      {e.title}
                    </div>
                    <div
                      style={{ color: "#475569", marginTop: 4, fontSize: 13 }}
                    >
                      ⏰ {e.time}
                    </div>
                    <div
                      style={{ color: "#475569", marginTop: 2, fontSize: 13 }}
                    >
                      📍 {e.place}
                    </div>
                    <div
                      style={{ color: "#475569", marginTop: 2, fontSize: 13 }}
                    >
                      👤 {e.coach}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BOOKING */}
          {activeTab === "booking" && (
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0 }}>
                📝 Book Sports Slot
              </h2>
              <p style={{ color: "#64748b", marginTop: 6 }}>
                Select sport + YES/NO (response saved locally for now)
              </p>

              <div style={{ marginTop: 10 }}>
                <label style={{ fontWeight: 800 }}>Select Sport</label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  style={{
                    width: "100%",
                    marginTop: 6,
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    padding: 12,
                  }}
                >
                  {slots.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
                <button
                  onClick={() => setSlotAnswer("YES")}
                  style={{
                    flex: 1,
                    padding: "12px 14px",
                    borderRadius: 12,
                    border:
                      slotAnswer === "YES"
                        ? "2px solid black"
                        : "1px solid #e2e8f0",
                    background: "white",
                    fontWeight: 900,
                    cursor: "pointer",
                  }}
                >
                  ✅ YES
                </button>

                <button
                  onClick={() => setSlotAnswer("NO")}
                  style={{
                    flex: 1,
                    padding: "12px 14px",
                    borderRadius: 12,
                    border:
                      slotAnswer === "NO"
                        ? "2px solid black"
                        : "1px solid #e2e8f0",
                    background: "white",
                    fontWeight: 900,
                    cursor: "pointer",
                  }}
                >
                  ❌ NO
                </button>
              </div>

              <button
                onClick={saveBooking}
                style={{
                  marginTop: 12,
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "none",
                  background: "black",
                  color: "white",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Submit Response
              </button>
            </div>
          )}

          {/* UPDATES */}
          {activeTab === "updates" && (
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0 }}>
                📢 Match Updates
              </h2>
              <p style={{ color: "#64748b", marginTop: 6 }}>
                Live / upcoming / finished (dummy)
              </p>

              <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                {matchUpdates.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: 16,
                      padding: 14,
                      background: "white",
                    }}
                  >
                    <div style={{ fontWeight: 900 }}>{m.match}</div>
                    <div
                      style={{ marginTop: 4, color: "#475569", fontSize: 13 }}
                    >
                      Status: <b>{m.status}</b>
                    </div>
                    <div
                      style={{ marginTop: 2, color: "#475569", fontSize: 13 }}
                    >
                      {m.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COMPLAINT */}
          {activeTab === "complaint" && (
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0 }}>
                🛠️ Complaint / Issue
              </h2>
              <p style={{ color: "#64748b", marginTop: 6 }}>
                Raise sports related issue (ground, equipment, timings)
              </p>

              <div style={{ marginTop: 10 }}>
                <label style={{ fontWeight: 800 }}>Category</label>
                <select
                  value={complaintCategory}
                  onChange={(e) => setComplaintCategory(e.target.value)}
                  style={{
                    width: "100%",
                    marginTop: 6,
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    padding: 12,
                  }}
                >
                  <option>Ground Issue</option>
                  <option>Equipment Issue</option>
                  <option>Coach / Timing Issue</option>
                  <option>Other</option>
                </select>
              </div>

              <div style={{ marginTop: 10 }}>
                <label style={{ fontWeight: 800 }}>Complaint Details</label>
                <textarea
                  value={complaintText}
                  onChange={(e) => setComplaintText(e.target.value)}
                  placeholder="Write full details..."
                  rows={4}
                  style={{
                    width: "100%",
                    marginTop: 6,
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    padding: 12,
                    resize: "vertical",
                  }}
                />
              </div>

              <button
                onClick={submitComplaint}
                style={{
                  marginTop: 12,
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "none",
                  background: "black",
                  color: "white",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Submit Complaint
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TabBtn({ title, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 14px",
        borderRadius: 12,
        border: active ? "2px solid black" : "1px solid #e2e8f0",
        background: active ? "#f1f5f9" : "white",
        fontWeight: 900,
        cursor: "pointer",
      }}
    >
      {title}
    </button>
  );
}
