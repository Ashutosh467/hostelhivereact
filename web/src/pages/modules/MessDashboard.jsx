import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const WEEK_MENU = {
  Monday: {
    breakfast: "Poha + Tea",
    lunch: "Rajma Chawal + Salad",
    dinner: "Roti + Aloo Matar + Rice",
  },
  Tuesday: {
    breakfast: "Paratha + Curd",
    lunch: "Chole Rice + Salad",
    dinner: "Roti + Dal + Sabzi",
  },
  Wednesday: {
    breakfast: "Upma + Tea",
    lunch: "Kadhi Chawal + Salad",
    dinner: "Roti + Paneer + Rice",
  },
  Thursday: {
    breakfast: "Idli + Sambhar",
    lunch: "Dal Rice + Sabzi",
    dinner: "Roti + Chicken/Soya + Rice",
  },
  Friday: {
    breakfast: "Bread Omelette/Paneer + Tea",
    lunch: "Mix Veg + Rice + Salad",
    dinner: "Roti + Dal Makhani + Rice",
  },
  Saturday: {
    breakfast: "Chole Bhature",
    lunch: "Pulao + Raita",
    dinner: "Roti + Sabzi + Rice",
  },
  Sunday: {
    breakfast: "Dosa + Chutney",
    lunch: "Special Thali + Sweet",
    dinner: "Roti + Dal + Rice",
  },
};

function getTodayName() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[new Date().getDay()];
}

function saveLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function readLocal(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function MessDashboard() {
  const nav = useNavigate();

  const today = useMemo(() => getTodayName(), []);
  const todayMenu = WEEK_MENU[today];

  const [activeTab, setActiveTab] = useState("routine"); // routine | booking | rating | complaint
  const [msg, setMsg] = useState("");

  // Booking state
  const [booking, setBooking] = useState({
    breakfast: "YES",
    lunch: "YES",
    dinner: "YES",
  });

  // Rating state
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");

  // Complaint state
  const [category, setCategory] = useState("Food Quality");
  const [complaint, setComplaint] = useState("");

  useEffect(() => {
    const prevBooking = readLocal("mess_booking_today", null);
    if (prevBooking) setBooking(prevBooking);
  }, []);

  const submitBooking = () => {
    setMsg("");

    const payload = {
      day: today,
      booking,
      menu: todayMenu,
      createdAt: new Date().toISOString(),
    };

    saveLocal("mess_booking_today", booking);

    const all = readLocal("mess_booking_all", []);
    all.unshift(payload);
    saveLocal("mess_booking_all", all);

    setMsg("✅ Booking saved successfully!");
  };

  const submitRating = () => {
    setMsg("");

    if (!feedback.trim() || feedback.trim().split(" ").length < 3) {
      setMsg("❌ Please write feedback properly (min 3 words)");
      return;
    }

    const payload = {
      day: today,
      rating,
      feedback,
      createdAt: new Date().toISOString(),
    };

    const all = readLocal("mess_ratings_all", []);
    all.unshift(payload);
    saveLocal("mess_ratings_all", all);

    setMsg("✅ Rating submitted successfully!");
  };

  const submitComplaint = () => {
    setMsg("");

    if (!complaint.trim()) {
      setMsg("❌ Please write complaint details");
      return;
    }

    const payload = {
      day: today,
      category,
      complaint,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    const all = readLocal("mess_complaints_all", []);
    all.unshift(payload);
    saveLocal("mess_complaints_all", all);

    setMsg("✅ Complaint submitted successfully!");
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
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0 }}>
              🍱 Mess Dashboard
            </h1>
            <p style={{ marginTop: 6, color: "#64748b" }}>
              Today: <b>{today}</b>
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
          style={{
            marginTop: 14,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: 12,
          }}
        >
          <button
            onClick={() => setActiveTab("routine")}
            style={tabBtn(activeTab === "routine")}
          >
            📅 Daily Routine
          </button>

          <button
            onClick={() => setActiveTab("booking")}
            style={tabBtn(activeTab === "booking")}
          >
            ✅ Book Your Food
          </button>

          <button
            onClick={() => setActiveTab("rating")}
            style={tabBtn(activeTab === "rating")}
          >
            ⭐ Rating & Feedback
          </button>

          <button
            onClick={() => setActiveTab("complaint")}
            style={tabBtn(activeTab === "complaint")}
          >
            🧾 Food Complaint
          </button>
        </div>

        {/* Content */}
        <div style={{ marginTop: 16 }}>
          {activeTab === "routine" && (
            <div style={card()}>
              <h2 style={h2()}>📅 Today’s Menu</h2>

              {/* ✅ FIXED: Properly show item below heading */}
              <div style={grid3()}>
                <MealCard
                  title="Breakfast"
                  label="Breakfast Menu"
                  value={todayMenu.breakfast}
                />
                <MealCard
                  title="Lunch"
                  label="Lunch Menu"
                  value={todayMenu.lunch}
                />
                <MealCard
                  title="Dinner"
                  label="Dinner Menu"
                  value={todayMenu.dinner}
                />
              </div>
            </div>
          )}

          {activeTab === "booking" && (
            <div style={card()}>
              <h2 style={h2()}>✅ Book Your Food</h2>
              <p style={{ color: "#64748b", marginTop: 6 }}>
                Choose YES/NO for each meal
              </p>

              <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
                <MealYesNo
                  label="Breakfast"
                  menu={todayMenu.breakfast}
                  value={booking.breakfast}
                  onChange={(v) => setBooking((p) => ({ ...p, breakfast: v }))}
                />
                <MealYesNo
                  label="Lunch"
                  menu={todayMenu.lunch}
                  value={booking.lunch}
                  onChange={(v) => setBooking((p) => ({ ...p, lunch: v }))}
                />
                <MealYesNo
                  label="Dinner"
                  menu={todayMenu.dinner}
                  value={booking.dinner}
                  onChange={(v) => setBooking((p) => ({ ...p, dinner: v }))}
                />
              </div>

              <button onClick={submitBooking} style={primaryBtn()}>
                Confirm & Save
              </button>
            </div>
          )}

          {activeTab === "rating" && (
            <div style={card()}>
              <h2 style={h2()}>⭐ Rating & Feedback</h2>

              <div style={{ marginTop: 12 }}>
                <label style={label()}>Rating (1 to 5)</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  style={input()}
                >
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Good</option>
                  <option value={3}>3 - Average</option>
                  <option value={2}>2 - Bad</option>
                  <option value={1}>1 - Worst</option>
                </select>
              </div>

              <div style={{ marginTop: 12 }}>
                <label style={label()}>Feedback</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Write feedback..."
                  style={{ ...input(), minHeight: 90 }}
                />
              </div>

              <button onClick={submitRating} style={primaryBtn()}>
                Submit Rating
              </button>
            </div>
          )}

          {activeTab === "complaint" && (
            <div style={card()}>
              <h2 style={h2()}>🧾 Food Complaint</h2>

              <div style={{ marginTop: 12 }}>
                <label style={label()}>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={input()}
                >
                  <option>Food Quality</option>
                  <option>Hygiene Issue</option>
                  <option>Quantity Problem</option>
                  <option>Late Serving</option>
                  <option>Staff Behaviour</option>
                  <option>Other</option>
                </select>
              </div>

              <div style={{ marginTop: 12 }}>
                <label style={label()}>Complaint Details</label>
                <textarea
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  placeholder="Write complaint..."
                  style={{ ...input(), minHeight: 100 }}
                />
              </div>

              <button onClick={submitComplaint} style={primaryBtn()}>
                Submit Complaint
              </button>
            </div>
          )}

          {msg && (
            <div
              style={{
                marginTop: 14,
                padding: 12,
                borderRadius: 12,
                background: msg.startsWith("❌") ? "#fef2f2" : "#ecfdf5",
                color: msg.startsWith("❌") ? "#991b1b" : "#065f46",
                fontWeight: 800,
              }}
            >
              {msg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MealCard({ title, label, value }) {
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 16,
        padding: 14,
        background: "#f8fafc",
      }}
    >
      {/* Title */}
      <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>

      {/* ✅ Added line */}
      <div style={{ marginTop: 6, fontSize: 12, color: "#64748b" }}>
        {label}
      </div>

      {/* Menu item */}
      <div
        style={{
          marginTop: 10,
          color: "#0f172a",
          fontSize: 14,
          fontWeight: 800,
          lineHeight: 1.4,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function MealYesNo({ label, menu, value, onChange }) {
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 16,
        padding: 14,
        background: "#f8fafc",
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 15 }}>{label}</div>
      <div style={{ color: "#475569", fontSize: 13, marginTop: 4 }}>{menu}</div>

      <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
        <button
          onClick={() => onChange("YES")}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid #cbd5e1",
            background: value === "YES" ? "black" : "white",
            color: value === "YES" ? "white" : "black",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          YES
        </button>

        <button
          onClick={() => onChange("NO")}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid #cbd5e1",
            background: value === "NO" ? "black" : "white",
            color: value === "NO" ? "white" : "black",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          NO
        </button>
      </div>
    </div>
  );
}

function tabBtn(active) {
  return {
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #e2e8f0",
    background: active ? "black" : "white",
    color: active ? "white" : "black",
    fontWeight: 900,
    cursor: "pointer",
  };
}

function card() {
  return {
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: 16,
    background: "white",
  };
}

function h2() {
  return { margin: 0, fontSize: 18, fontWeight: 900 };
}

function grid3() {
  return {
    marginTop: 14,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
  };
}

function label() {
  return {
    display: "block",
    fontSize: 13,
    fontWeight: 900,
    color: "#0f172a",
  };
}

function input() {
  return {
    width: "100%",
    border: "1px solid #cbd5e1",
    borderRadius: 12,
    padding: 12,
    marginTop: 6,
    outline: "none",
    fontSize: 14,
  };
}

function primaryBtn() {
  return {
    width: "100%",
    marginTop: 14,
    padding: "12px 14px",
    borderRadius: 14,
    border: "none",
    background: "black",
    color: "white",
    fontWeight: 900,
    cursor: "pointer",
  };
}
