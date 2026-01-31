import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LostFound() {
  const nav = useNavigate();

  // Tabs
  const [tab, setTab] = useState("LOST"); // LOST | FOUND | ALL

  // Form
  const [type, setType] = useState("LOST"); // LOST | FOUND
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");

  // Data list
  const [posts, setPosts] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("hostelhive_lostfound_posts");
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  const savePosts = (list) => {
    setPosts(list);
    localStorage.setItem("hostelhive_lostfound_posts", JSON.stringify(list));
  };

  const handleSubmit = () => {
    if (!itemName.trim()) return alert("❌ Item name required");
    if (!location.trim()) return alert("❌ Location required");
    if (!date) return alert("❌ Date required");
    if (!contact.trim()) return alert("❌ Contact required");

    const newPost = {
      id: "LF-" + Date.now().toString().slice(-6),
      type,
      itemName: itemName.trim(),
      category,
      location: location.trim(),
      date,
      description: description.trim(),
      contact: contact.trim(),
      status: "OPEN",
      createdAt: new Date().toLocaleString(),
    };

    const updated = [newPost, ...posts];
    savePosts(updated);

    alert("✅ Posted Successfully! (Demo: stored locally)");

    // reset form
    setType("LOST");
    setItemName("");
    setCategory("Electronics");
    setLocation("");
    setDate("");
    setDescription("");
    setContact("");
  };

  const closePost = (id) => {
    const updated = posts.map((p) =>
      p.id === id ? { ...p, status: "CLOSED" } : p,
    );
    savePosts(updated);
  };

  const deletePost = (id) => {
    const updated = posts.filter((p) => p.id !== id);
    savePosts(updated);
  };

  const filtered = posts.filter((p) => {
    if (tab === "ALL") return true;
    return p.type === tab;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: 16 }}>
      <div
        style={{
          maxWidth: 1100,
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
              Lost & Found 🔎
            </h1>
            <p style={{ color: "#64748b", marginTop: 6 }}>
              Post Lost/Found items (Student Side Demo)
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
          <TabButton active={tab === "LOST"} onClick={() => setTab("LOST")}>
            Lost Items
          </TabButton>
          <TabButton active={tab === "FOUND"} onClick={() => setTab("FOUND")}>
            Found Items
          </TabButton>
          <TabButton active={tab === "ALL"} onClick={() => setTab("ALL")}>
            All Posts
          </TabButton>
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
          {/* Create Post */}
          <div
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: 16,
              padding: 14,
              background: "#fff",
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 900, marginTop: 0 }}>
              Create Post
            </h2>

            <div style={{ display: "grid", gap: 10 }}>
              <select
                style={inputStyle}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="LOST">LOST</option>
                <option value="FOUND">FOUND</option>
              </select>

              <input
                style={inputStyle}
                placeholder="Item Name (ex: Wallet, Phone, ID Card)"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />

              <select
                style={inputStyle}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Electronics</option>
                <option>Documents</option>
                <option>Accessories</option>
                <option>Clothing</option>
                <option>Books</option>
                <option>Other</option>
              </select>

              <input
                style={inputStyle}
                placeholder="Location (ex: Mess, Gate, Room, Ground)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <div>
                <div style={labelStyle}>Date</div>
                <input
                  type="date"
                  style={inputStyle}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <textarea
                style={{ ...inputStyle, minHeight: 90 }}
                placeholder="Description (color, brand, details...)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                style={inputStyle}
                placeholder="Contact (phone / room no.)"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />

              <button onClick={handleSubmit} style={primaryBtn}>
                Submit Post
              </button>
            </div>

            <p style={{ marginTop: 10, color: "#64748b", fontSize: 13 }}>
              Demo: abhi localStorage me save ho raha hai. Next: backend + admin
              verification.
            </p>
          </div>

          {/* Posts List */}
          <div
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: 16,
              padding: 14,
              background: "#fff",
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 900, marginTop: 0 }}>
              {tab === "ALL"
                ? "All Posts"
                : tab === "LOST"
                  ? "Lost Items"
                  : "Found Items"}
            </h2>

            {filtered.length === 0 ? (
              <p style={{ color: "#64748b" }}>No posts available.</p>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {filtered.map((p) => (
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
                        {p.type === "LOST" ? "❌ LOST" : "✅ FOUND"} —{" "}
                        {p.itemName}
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
                      style={{ marginTop: 6, color: "#334155", fontSize: 14 }}
                    >
                      <b>Category:</b> {p.category}
                    </div>

                    <div
                      style={{ marginTop: 4, color: "#334155", fontSize: 14 }}
                    >
                      <b>Location:</b> {p.location}
                    </div>

                    <div
                      style={{ marginTop: 4, color: "#334155", fontSize: 14 }}
                    >
                      <b>Date:</b> {p.date}
                    </div>

                    {p.description ? (
                      <div
                        style={{ marginTop: 4, color: "#334155", fontSize: 14 }}
                      >
                        <b>Details:</b> {p.description}
                      </div>
                    ) : null}

                    <div
                      style={{ marginTop: 4, color: "#334155", fontSize: 14 }}
                    >
                      <b>Contact:</b> {p.contact}
                    </div>

                    <div
                      style={{ marginTop: 8, fontSize: 12, color: "#64748b" }}
                    >
                      Post ID: <b>{p.id}</b> | Created: {p.createdAt}
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
                        onClick={() => closePost(p.id)}
                        style={secondaryBtn}
                      >
                        Mark as Resolved
                      </button>

                      <button
                        onClick={() => deletePost(p.id)}
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

        <div style={{ marginTop: 14, fontSize: 13, color: "#64748b" }}>
          ✅ Next upgrade: Staff/Admin panel for verifying found items +
          notification to students.
        </div>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */
function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 14px",
        borderRadius: 999,
        border: "1px solid #cbd5e1",
        background: active ? "#0f172a" : "white",
        color: active ? "white" : "#0f172a",
        fontWeight: 900,
        cursor: "pointer",
      }}
    >
      {children}
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
  fontSize: 14,
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
