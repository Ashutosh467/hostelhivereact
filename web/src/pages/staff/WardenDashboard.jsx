import React, { useEffect, useState } from "react";
import {
  getPendingOutpasses,
  getApprovedOutpasses,
  getRejectedOutpasses,
  approveOutpass,
  rejectOutpass,
} from "../../services/outpassService";

export default function WardenDashboard() {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const formatDT = (d) => {
    try {
      return new Date(d).toLocaleString();
    } catch {
      return d;
    }
  };

  const loadAll = async () => {
    setMsg("");
    setLoading(true);
    try {
      const p = await getPendingOutpasses();
      const a = await getApprovedOutpasses();
      const r = await getRejectedOutpasses();

      setPending(p.list || []);
      setApproved(a.list || []);
      setRejected(r.list || []);
    } catch (e) {
      setMsg("❌ " + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleApprove = async (id) => {
    setMsg("");
    try {
      await approveOutpass(id);
      setMsg("✅ Approved + QR generated");
      await loadAll();
    } catch (e) {
      setMsg("❌ " + e.message);
    }
  };

  const handleReject = async (id) => {
    setMsg("");
    try {
      await rejectOutpass(id);
      setMsg("❌ Request Rejected");
      await loadAll();
    } catch (e) {
      setMsg("❌ " + e.message);
    }
  };

  const Card = ({ title, data, type }) => (
    <div className="bg-white rounded-2xl shadow p-5">
      <h2 className="text-lg font-bold">{title}</h2>
      {data.length === 0 ? (
        <p className="text-slate-500 mt-2">No records.</p>
      ) : (
        <div className="mt-3 space-y-3">
          {data.map((o) => (
            <div key={o._id} className="border rounded-2xl p-4 bg-slate-50">
              <div className="font-semibold">
                👤 {o.student?.name} ({o.student?.userId})
              </div>
              <div className="text-sm text-slate-600 mt-1">
                Reason: {o.reason} <br />
                Destination: {o.destination} <br />
                Out: {formatDT(o.fromTime)} <br />
                In: {formatDT(o.toTime)}
              </div>

              {type === "PENDING" && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleApprove(o._id)}
                    className="px-4 py-2 rounded-xl bg-black text-white font-semibold"
                  >
                    Approve + Generate QR
                  </button>
                  <button
                    onClick={() => handleReject(o._id)}
                    className="px-4 py-2 rounded-xl border font-semibold"
                  >
                    Disapprove
                  </button>
                </div>
              )}

              {type === "APPROVED" && (
                <div className="mt-3 text-sm">
                  <div className="font-semibold">Outpass Code:</div>
                  <div className="bg-white border rounded-lg p-2 break-all">
                    {o._id}
                  </div>
                  {o.qrImage && (
                    <img
                      src={o.qrImage}
                      alt="QR"
                      className="mt-2 w-36 h-36 border rounded-xl"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Warden Dashboard</h1>
          <button
            onClick={loadAll}
            disabled={loading}
            className="px-4 py-2 rounded-xl border"
          >
            {loading ? "Refreshing..." : "Refresh All"}
          </button>
        </div>

        {msg && (
          <div className="mt-4 p-3 rounded-xl bg-slate-100 text-sm">{msg}</div>
        )}

        <div className="grid md:grid-cols-3 gap-4 mt-5">
          <Card title="Pending Requests" data={pending} type="PENDING" />
          <Card title="Approved Requests" data={approved} type="APPROVED" />
          <Card title="Disapproved Requests" data={rejected} type="REJECTED" />
        </div>
      </div>
    </div>
  );
}
