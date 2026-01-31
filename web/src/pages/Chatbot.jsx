import React, { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([
    {
      from: "bot",
      text: "Hi! I’m HostelHive Assistant 🤖 Ask: Outpass status, Mess menu, Gym slot.",
    },
  ]);

  function send() {
    if (!msg.trim()) return;
    const userText = msg.trim();
    setChat((c) => [...c, { from: "user", text: userText }]);
    setMsg("");

    setTimeout(() => {
      setChat((c) => [
        ...c,
        {
          from: "bot",
          text: "Prototype reply: Backend will provide real-time answer here ✅",
        },
      ]);
    }, 300);
  }

  if (!open) {
    return (
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        🤖 Open ChatBot
      </button>
    );
  }

  return (
    <div className="chatbox">
      <header>
        <div className="badge">🤖 HostelHive Assistant</div>
        <button className="btn" onClick={() => setOpen(false)}>
          Close
        </button>
      </header>

      <main>
        {chat.map((m, i) => (
          <div
            key={i}
            className={`bubble ${m.from === "user" ? "user" : "bot"}`}
          >
            {m.text}
          </div>
        ))}
      </main>

      <footer>
        <input
          className="input"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type here..."
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button className="btn btn-primary" onClick={send}>
          Send
        </button>
      </footer>
    </div>
  );
}
