import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Mess() {
  const nav = useNavigate();

  // Demo Weekly Menu
  const weeklyMenu = useMemo(
    () => [
      {
        day: "Monday",
        breakfast: "Poha + Tea",
        lunch: "Rajma Chawal",
        dinner: "Aloo Paratha + Curd",
      },
      {
        day: "Tuesday",
        breakfast: "Idli + Sambar",
        lunch: "Chole Rice",
        dinner: "Veg Pulao + Paneer",
      },
      {
        day: "Wednesday",
        breakfast: "Upma + Tea",
        lunch: "Dal + Roti + Sabzi",
        dinner: "Fried Rice + Manchurian",
      },
      {
        day: "Thursday",
        breakfast: "Paratha + Pickle",
        lunch: "Kadhi Chawal",
        dinner: "Butter Roti + Paneer",
      },
      {
        day: "Friday",
        breakfast: "Sandwich + Tea",
        lunch: "Chana Dal + Rice",
        dinner: "Veg Biryani + Raita",
      },
      {
        day: "Saturday",
        breakfast: "Dosa + Chutney",
        lunch: "Mix Veg + Roti",
        dinner: "Dal Makhani + Rice",
      },
      {
        day: "Sunday",
        breakfast: "Poori + Aloo",
        lunch: "Special Thali",
        dinner: "Noodles + Soup",
      },
    ],
    [],
  );

  // Rating
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");

  // Complaint
  const [category, setCategory] = useState("Food Quality");
  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("Normal");

  // History (LocalStorage)
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("hostelhive_mess_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveHistory = (list) => {
    setHistory(list);
    localStorage.setItem("hostelhive_mess_history", JSON.stringify(list));
  };

  const submitRating = () => {
    if (!feedback.trim()) {
      alert("❌ Please write feedback.");
      return;
    }

    const entry = {
      id: Date.now(),
      type: "RATING",
      rating,
      feedback: feedback.trim(),
      status: "SUBMITTED",
      createdAt: new Date().toISOString(),
    };

    saveHistory([entry, ...history]);
    setFeedback("");
    setRating(5);
    alert("✅ Rating submitted!");
  };

  const submitComplaint = () => {
    if (!issue.trim()) {
      alert("❌ Please write complaint details.");
      return;
    }

    const entry = {
      id: Date.now(),
      type: "COMPLAINT",
      category,
      issue: issue.trim(),
      priority,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    saveHistory([entry, ...history]);
    setIssue("");
    setCategory("Food Quality");
    setPriority("Normal");
    alert("✅ Complaint submitted!");
  };

  const clearAll = () => {
    if (!confirm("Clear all mess history?")) return;
    saveHistory([]);
  };

  const badge = (status) => {
    const base = {
      padding: "6px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 800,
      display: "inline-block",
    };

    if (status === "PENDING")
      return (
        <span style={{ ...base, background: "#fff7ed", color: "#9a3412" }}>
          PENDING
        </span>
      );

    if (status === "SUBMITTED")
      return (
        <span style={{ ...base, background: "#ecfeff", color: "#155e75" }}>
          SUBMITTED
        </span>
      );

    return (
      <span style={{ ...base, background: "#f1f5f9", color: "#0f172a" }}>
        {status}
      </span>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: 16 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            background: "white",
            borderRadius: 18,
            padding: 18,
            boxShadow: "0 10px 30px rgba(2,6,23,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0 }}>
                🍱 Mess Module
              </h1>
              <p style={{ color: "#64748b", marginTop: 6 }}>
                Food Rating + Complaint (Student Side)
              </p>
            </div>

            <button
              onClick={() => nav("/student/dashboard")}
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                border: "1px solid #cbd5e1",
                background: "white",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Cards */}
        <div
          style={{
            marginTop: 14,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 14,
          }}
        >
          {/* Weekly Menu */}
          <div
            style={{
              background: "white",
              borderRadius: 18,
              padding: 16,
              border: "1px solid #e2e8f0",
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 900, marginTop: 0 }}>
              📅 Weekly Menu (Demo)
            </h2>

            <div style={{ display: "grid", gap: 10 }}>
              {weeklyMenu.map((d) => (
                <div
                  key={d.day}
                  style={{
                    padding: 12,
                    borderRadius: 14,
                    background: "#f1f5f9",
                  }}
                >
                  <div style={{ fontWeight: 900 }}>{d.day}</div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>
                    <b>Breakfast:</b> {d.breakfast}
                  </div>
                  <div style={{ fontSize: 13, marginTop: 2 }}>
                    <b>Lunch:</b> {d.lunch}
                  </div>
                  <div style={{ fontSize: 13, marginTop: 2 }}>
                    <b>Dinner:</b> {d.dinner}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div
            style={{
              background: "white",
              borderRadius: 18,
              padding: 16,
              border: "1px solid #e2e8f0",
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 900, marginTop: 0 }}>
              ⭐ Food Rating
            </h2>

            <label style={{ fontSize: 13, fontWeight: 800, color: "#334155" }}>
              Rating
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 12,
                border: "1px solid #cbd5e1",
                marginTop: 6,
              }}
            >
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Good</option>
              <option value={3}>3 - Average</option>
              <option value={2}>2 - Bad</option>
              <option value={1}>1 - Worst</option>
            </select>

            <label
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: "#334155",
                marginTop: 12,
                display: "block",
              }}
            >
              Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write feedback..."
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 12,
                border: "1px solid #cbd5e1",
                marginTop: 6,
                minHeight: 90,
                resize: "vertical",
              }}
            />

            <button
              onClick={submitRating}
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
              Submit Rating
            </button>
          </div>

          {/* Complaint */}
          <div
            style={{
              background: "white",
              borderRadius: 18,
              padding: 16,
              border: "1px solid #e2e8f0",
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 900, marginTop: 0 }}>
              📌 Raise Complaint
            </h2>

            <label style={{ fontSize: 13, fontWeight: 800, color: "#334155" }}>
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 12,
                border: "1px solid #cbd5e1",
                marginTop: 6,
              }}
            >
              <option>Food Quality</option>
              <option>Hygiene</option>
              <option>Quantity</option>
              <option>Late Serving</option>
              <option>Staff Behaviour</option>
              <option>Other</option>
            </select>

            <label
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: "#334155",
                marginTop: 12,
                display: "block",
              }}
            >
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 12,
                border: "1px solid #cbd5e1",
                marginTop: 6,
              }}
            >
              <option>Normal</option>
              <option>High</option>
              <option>Urgent</option>
            </select>

            <label
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: "#334155",
                marginTop: 12,
                display: "block",
              }}
            >
              Complaint Details
            </label>
            <textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="Write complaint..."
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 12,
                border: "1px solid #cbd5e1",
                marginTop: 6,
                minHeight: 90,
                resize: "vertical",
              }}
            />

            <button
              onClick={submitComplaint}
              style={{
                marginTop: 12,
                width: "100%",
                padding: "12px 14px",
                borderRadius: 12,
                border: "none",
                background: "#0f172a",
                color: "white",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Submit Complaint
            </button>
          </div>

          {/* History */}
          <div
            style={{
              background: "white",
              borderRadius: 18,
              padding: 16,
              border: "1px solid #e2e8f0",
              gridColumn: "1 / -1",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <h2 style={{ fontSize: 18, fontWeight: 900, margin: 0 }}>
                🧾 My Mess History
              </h2>

              <button
                onClick={clearAll}
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: "1px solid #fecaca",
                  background: "#fff1f2",
                  color: "#9f1239",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Clear All
              </button>
            </div>

            <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
              {history.length === 0 ? (
                <div
                  style={{
                    padding: 14,
                    borderRadius: 14,
                    background: "#f1f5f9",
                    color: "#475569",
                    fontWeight: 700,
                  }}
                >
                  No history yet.
                </div>
              ) : (
                history.map((h) => (
                  <div
                    key={h.id}
                    style={{
                      padding: 14,
                      borderRadius: 14,
                      border: "1px solid #e2e8f0",
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
                        {h.type === "RATING"
                          ? `⭐ Rating: ${h.rating}/5`
                          : `📌 Complaint: ${h.category}`}
                      </div>
                      {badge(h.status)}
                    </div>

                    <div style={{ marginTop: 6, color: "#334155" }}>
                      {h.type === "RATING" ? h.feedback : h.issue}
                    </div>

                    <div
                      style={{ marginTop: 8, fontSize: 12, color: "#64748b" }}
                    >
                      {new Date(h.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
