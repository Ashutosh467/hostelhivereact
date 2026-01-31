import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Gym() {
  const nav = useNavigate();

  const SLOT_CAPACITY = 5;

  // ✅ Register panel
  const [showRegister, setShowRegister] = useState(false);

  // ✅ Validity selection
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");

  // Slots list
  const slots = useMemo(
    () => [
      { id: "SLOT_6_7", label: "06:00 AM - 07:00 AM" },
      { id: "SLOT_7_8", label: "07:00 AM - 08:00 AM" },
      { id: "SLOT_8_9", label: "08:00 AM - 09:00 AM" },
      { id: "SLOT_5_6", label: "05:00 PM - 06:00 PM" },
      { id: "SLOT_6_7_PM", label: "06:00 PM - 07:00 PM" },
    ],
    [],
  );

  // Fake filled counts (demo)
  const [filled, setFilled] = useState({
    SLOT_6_7: 5,
    SLOT_7_8: 3,
    SLOT_8_9: 2,
    SLOT_5_6: 5,
    SLOT_6_7_PM: 1,
  });

  const [preferredSlot, setPreferredSlot] = useState("SLOT_6_7");
  const [message, setMessage] = useState("");
  const [registered, setRegistered] = useState(null);

  const selectedSlotObj = slots.find((s) => s.id === preferredSlot);

  // ✅ AI suggestions
  const suggestions = useMemo(() => {
    const available = slots
      .map((s) => ({
        ...s,
        left: SLOT_CAPACITY - (filled[s.id] || 0),
      }))
      .filter((s) => s.left > 0)
      .sort((a, b) => b.left - a.left);

    return available.slice(0, 3);
  }, [slots, filled]);

  const handleRegister = () => {
    setMessage("");

    // ✅ Must select validity first
    if (!validFrom || !validTo) {
      setMessage(
        "❌ Please select Start Date and End Date first (Register Here).",
      );
      return;
    }

    const start = new Date(validFrom);
    const end = new Date(validTo);

    if (start > end) {
      setMessage("❌ Start Date cannot be greater than End Date");
      return;
    }

    const currentFilled = filled[preferredSlot] || 0;

    if (currentFilled >= SLOT_CAPACITY) {
      setMessage("❌ This slot is FULL. Choose another slot from suggestions.");
      return;
    }

    const passId =
      "GYM-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const qrToken =
      "QR-" + Math.random().toString(36).slice(2) + "-" + preferredSlot;

    setRegistered({
      validFrom,
      validTo,
      slotLabel: selectedSlotObj?.label || "",
      passId,
      qrToken,
    });

    setFilled((prev) => ({
      ...prev,
      [preferredSlot]: (prev[preferredSlot] || 0) + 1,
    }));

    setMessage("✅ Gym registration successful!");
  };

  const pickSuggestion = (slotId) => {
    setPreferredSlot(slotId);
    setMessage("✅ Suggested slot selected. Now click Confirm Registration.");
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
              🏋️ Gym Registration
            </h1>
            <p style={{ color: "#64748b", marginTop: 6 }}>
              Select validity → choose slot → confirm registration
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

        {/* ✅ TOP BUTTON Register Here */}
        <div style={{ marginTop: 14 }}>
          <button
            onClick={() => setShowRegister((p) => !p)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 14,
              border: "none",
              background: "black",
              color: "white",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            📝 Register Here
          </button>
        </div>

        {/* ✅ Date select panel */}
        {showRegister && (
          <div
            style={{
              marginTop: 12,
              padding: 14,
              borderRadius: 16,
              background: "#f1f5f9",
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 14 }}>
              Select Registration Validity Duration
            </div>

            <div
              style={{
                marginTop: 10,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontWeight: 800 }}>Start Date</label>
                <input
                  type="date"
                  value={validFrom}
                  onChange={(e) => setValidFrom(e.target.value)}
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    padding: 12,
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontWeight: 800 }}>End Date</label>
                <input
                  type="date"
                  value={validTo}
                  onChange={(e) => setValidTo(e.target.value)}
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    padding: 12,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ✅ Validity always shown BELOW register section */}
        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 14,
            background: "white",
            border: "1px solid #e2e8f0",
            fontWeight: 900,
            color: "#0f172a",
          }}
        >
          📅 Registration Validity:{" "}
          {validFrom && validTo ? (
            <span>
              {validFrom} → {validTo}
            </span>
          ) : (
            <span style={{ color: "#64748b" }}>
              Not selected (Click Register Here)
            </span>
          )}
        </div>

        {/* ✅ Slots + Seats left + AI section (below validity) */}
        <div
          style={{
            marginTop: 14,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontWeight: 800 }}>Preferred Slot</label>
            <select
              value={preferredSlot}
              onChange={(e) => setPreferredSlot(e.target.value)}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 12,
              }}
            >
              {slots.map((s) => {
                const left = SLOT_CAPACITY - (filled[s.id] || 0);
                const status = left <= 0 ? "FULL ❌" : `${left} seats left ✅`;

                return (
                  <option key={s.id} value={s.id}>
                    {s.label} — {status}
                  </option>
                );
              })}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontWeight: 800 }}>Seats Left</label>
            <div
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 12,
                background: "#f8fafc",
                fontWeight: 900,
              }}
            >
              {SLOT_CAPACITY - (filled[preferredSlot] || 0)} / {SLOT_CAPACITY}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
          <button
            onClick={handleRegister}
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: "none",
              background: "black",
              color: "white",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            ✅ Confirm Registration
          </button>

          <button
            onClick={() => {
              setRegistered(null);
              setMessage("");
              setValidFrom("");
              setValidTo("");
              setShowRegister(false);
            }}
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: "1px solid #cbd5e1",
              background: "white",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>

        {/* Message */}
        {message && (
          <div
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 14,
              background: message.includes("❌") ? "#fef2f2" : "#ecfdf5",
              color: message.includes("❌") ? "#b91c1c" : "#047857",
              fontWeight: 800,
            }}
          >
            {message}
          </div>
        )}

        {/* AI Suggestions */}
        <div
          style={{
            marginTop: 18,
            borderTop: "1px solid #e2e8f0",
            paddingTop: 16,
          }}
        >
          <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0 }}>
            🤖 AI Suggested Available Slots
          </h2>
          <p style={{ color: "#64748b", marginTop: 6, fontSize: 13 }}>
            If your slot is full, pick one of these recommended slots.
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {suggestions.length === 0 ? (
              <div style={{ color: "#b91c1c", fontWeight: 900 }}>
                ❌ All slots are FULL today.
              </div>
            ) : (
              suggestions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => pickSuggestion(s.id)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    background: "white",
                    fontWeight: 900,
                    cursor: "pointer",
                  }}
                >
                  {s.label} ({s.left} left)
                </button>
              ))
            )}
          </div>
        </div>

        {/* Pass Details */}
        {registered && (
          <div
            style={{
              marginTop: 18,
              borderTop: "1px solid #e2e8f0",
              paddingTop: 16,
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0 }}>
              🎫 My Gym Pass
            </h2>

            <div
              style={{
                marginTop: 10,
                background: "#0f172a",
                color: "white",
                borderRadius: 16,
                padding: 16,
              }}
            >
              <div style={{ fontWeight: 900, fontSize: 14 }}>
                Pass ID: {registered.passId}
              </div>

              <div style={{ marginTop: 6, fontSize: 13, opacity: 0.9 }}>
                Validity: {registered.validFrom} → {registered.validTo}
              </div>

              <div style={{ marginTop: 6, fontSize: 13, opacity: 0.9 }}>
                Slot: {registered.slotLabel}
              </div>

              <div
                style={{
                  marginTop: 12,
                  padding: 12,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 14,
                }}
              >
                <div style={{ fontWeight: 900 }}>QR Token (Demo)</div>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 12,
                    wordBreak: "break-all",
                    opacity: 0.95,
                  }}
                >
                  {registered.qrToken}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
