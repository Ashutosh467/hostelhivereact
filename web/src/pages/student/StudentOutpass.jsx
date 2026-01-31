import React, { useEffect, useState } from "react";
import { requestOutpass, getMyOutpasses } from "../../services/outpassService";

export default function StudentOutpass() {
  const [reason, setReason] = useState("");
  const [destination, setDestination] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [list, setList] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  const loadMy = async () => {
    setLoadingList(true);
    setMsg("");
    try {
      const data = await getMyOutpasses();
      setList(data.list || []);
    } catch (e) {
      setMsg("❌ " + e.message);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadMy();
  }, []);

  const handleSend = async () => {
    setMsg("");

    if (!reason.trim() || !destination.trim() || !fromTime || !toTime) {
      setMsg("❌ Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await requestOutpass({
        reason: reason.trim(),
        destination: destination.trim(),
        fromTime: new Date(fromTime).toISOString(),
        toTime: new Date(toTime).toISOString(),
      });

      setMsg("✅ Request sent to Warden (PENDING)");
      setReason("");
      setDestination("");
      setFromTime("");
      setToTime("");
      await loadMy();
    } catch (e) {
      setMsg("❌ " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDT = (d) => {
    try {
      return new Date(d).toLocaleString();
    } catch {
      return d;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Student → Outpass Request</h1>
        <p className="text-slate-500 text-sm mt-1">
          Fill details → Confirm → Warden approves → QR/Code generated
        </p>

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow p-5 mt-4">
          <div className="grid md:grid-cols-2 gap-3">
            <input
              className="border rounded-xl p-3"
              placeholder="Reason (ex: Home / Market)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <input
              className="border rounded-xl p-3"
              placeholder="Destination (ex: Madhubani / Main Gate)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />

            <div>
              <label className="text-sm text-slate-600">Out Time (From)</label>
              <input
                className="border rounded-xl p-3 w-full"
                type="datetime-local"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-slate-600">In Time (To)</label>
              <input
                className="border rounded-xl p-3 w-full"
                type="datetime-local"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleSend}
            disabled={loading}
            className="mt-4 w-full bg-black text-white rounded-xl p-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Sending..." : "Confirm & Send to Warden"}
          </button>

          {msg && (
            <div className="mt-4 p-3 rounded-xl bg-slate-100 text-sm">
              {msg}
            </div>
          )}
        </div>

        {/* MY REQUESTS */}
        <div className="bg-white rounded-2xl shadow p-5 mt-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">My Outpass Requests</h2>
            <button
              onClick={loadMy}
              className="px-4 py-2 rounded-xl border"
              disabled={loadingList}
            >
              {loadingList ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {list.length === 0 ? (
            <p className="text-slate-500 mt-3">No requests yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {list.map((o) => (
                <div key={o._id} className="border rounded-2xl p-4 bg-slate-50">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold">
                        {o.reason} → {o.destination}
                      </div>
                      <div className="text-sm text-slate-600">
                        Out: {formatDT(o.fromTime)} <br />
                        In: {formatDT(o.toTime)}
                      </div>
                    </div>

                    <div className="font-bold">
                      {o.status === "PENDING" && (
                        <span className="text-orange-600">PENDING</span>
                      )}
                      {o.status === "APPROVED" && (
                        <span className="text-green-600">APPROVED</span>
                      )}
                      {o.status === "REJECTED" && (
                        <span className="text-red-600">REJECTED</span>
                      )}
                      {o.status === "OUT" && (
                        <span className="text-blue-600">OUT</span>
                      )}
                      {o.status === "IN" && (
                        <span className="text-purple-600">IN</span>
                      )}
                    </div>
                  </div>

                  {/* APPROVED DETAILS */}
                  {o.status === "APPROVED" && (
                    <div className="mt-3 bg-white border rounded-xl p-3">
                      <div className="text-green-700 font-semibold">
                        ✅ Approved by Warden
                      </div>
                      <div className="text-sm text-slate-700 mt-2">
                        Show QR OR Code to Guard at Gate
                      </div>

                      <div className="mt-3 text-sm">
                        <div className="font-semibold">Outpass Code</div>
                        <div className="bg-slate-100 p-2 rounded-lg break-all">
                          {o._id}
                        </div>

                        <div className="font-semibold mt-3">
                          QR Token (for scan)
                        </div>
                        <div className="bg-slate-100 p-2 rounded-lg break-all">
                          {o.qrToken || "Not generated yet"}
                        </div>

                        {o.qrImage && (
                          <div className="mt-3">
                            <div className="font-semibold">QR Image</div>
                            <img
                              src={o.qrImage}
                              alt="QR"
                              className="mt-2 w-44 h-44 border rounded-xl"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* REJECTED MESSAGE */}
                  {o.status === "REJECTED" && (
                    <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
                      ❌ Disapproved by Warden
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
