import React, { useEffect, useRef, useState } from "react";
import { scanQR, verifyByCode } from "../../services/outpassService";
import { Html5Qrcode } from "html5-qrcode";

export default function GuardDashboard() {
  const [msg, setMsg] = useState("");
  const [details, setDetails] = useState(null);

  // Code verify (यह रहेगा क्योंकि तूने कहा code वाला सही है)
  const [code, setCode] = useState("");

  // QR scanner states
  const [showScanner, setShowScanner] = useState(false);
  const scannerRef = useRef(null);
  const scannedOnceRef = useRef(false);

  const stopScanner = async () => {
    try {
      if (scannerRef.current) {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
      }
    } catch (e) {
      // ignore
    }
  };

  const handleScanToken = async (token) => {
    if (!token || !token.trim()) return;

    setMsg("");
    setDetails(null);

    try {
      const data = await scanQR(token.trim());
      setMsg("✅ QR Verified Successfully");
      setDetails(data.details);

      // scan success → close camera
      setShowScanner(false);
    } catch (e) {
      setMsg("❌ " + e.message);
    }
  };

  useEffect(() => {
    const startScanner = async () => {
      if (!showScanner) {
        await stopScanner();
        scannedOnceRef.current = false;
        return;
      }

      setMsg("");
      setDetails(null);

      const elementId = "qr-reader";

      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(elementId);
      }

      try {
        await scannerRef.current.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          async (decodedText) => {
            // prevent multiple scans firing
            if (scannedOnceRef.current) return;
            scannedOnceRef.current = true;

            await handleScanToken(decodedText);
          },
          () => {},
        );
      } catch (e) {
        setMsg("❌ Camera start failed. Please allow camera permission.");
      }
    };

    startScanner();

    return () => {
      stopScanner();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showScanner]);

  const handleVerifyCode = async () => {
    setMsg("");
    setDetails(null);

    if (!code.trim()) {
      setMsg("❌ Outpass Code required");
      return;
    }

    try {
      const data = await verifyByCode(code.trim());
      setMsg("✅ Code Verified Successfully");
      setDetails(data.details);
    } catch (e) {
      setMsg("❌ " + e.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">Guard Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">
          Scan QR using Camera OR verify by Code
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {/* ✅ ONLY SCAN QR BUTTON (NO PASTE TOKEN INPUT) */}
          <div className="bg-white rounded-2xl shadow p-5">
            <h2 className="font-bold">Scan QR (Camera)</h2>

            {!showScanner ? (
              <button
                onClick={() => setShowScanner(true)}
                className="mt-3 w-full bg-black text-white rounded-xl p-3 font-semibold"
              >
                Scan QR
              </button>
            ) : (
              <div className="mt-3">
                <div
                  id="qr-reader"
                  className="rounded-xl overflow-hidden border"
                />

                <button
                  onClick={() => setShowScanner(false)}
                  className="mt-3 w-full border rounded-xl p-3 font-semibold"
                >
                  Close Camera
                </button>

                <p className="text-xs text-slate-500 mt-2">
                  📌 QR scan होते ही student details show हो जाएगी.
                </p>
              </div>
            )}
          </div>

          {/* Code verify रहेगा */}
          <div className="bg-white rounded-2xl shadow p-5">
            <h2 className="font-bold">Verify by Code</h2>

            <input
              className="mt-3 w-full border rounded-xl p-3"
              placeholder="Enter Outpass Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <button
              onClick={handleVerifyCode}
              className="mt-3 w-full bg-black text-white rounded-xl p-3 font-semibold"
            >
              Verify Code
            </button>
          </div>
        </div>

        {msg && (
          <div className="mt-4 p-3 rounded-xl bg-slate-100 text-sm">{msg}</div>
        )}

        {details && (
          <div className="mt-4 bg-white rounded-2xl shadow p-5">
            <h2 className="text-lg font-bold">Student Details</h2>

            <div className="mt-2 text-sm text-slate-700 space-y-1">
              <div>
                <b>Name:</b> {details.student?.name}
              </div>
              <div>
                <b>User ID:</b> {details.student?.userId}
              </div>
              <div>
                <b>Hostel:</b> {details.student?.hostel}
              </div>
              <div>
                <b>Floor:</b> {details.student?.floor}
              </div>

              <hr className="my-2" />

              <div>
                <b>Reason:</b> {details.reason}
              </div>
              <div>
                <b>Destination:</b> {details.destination}
              </div>
              <div>
                <b>Out Time:</b> {new Date(details.fromTime).toLocaleString()}
              </div>
              <div>
                <b>In Time:</b> {new Date(details.toTime).toLocaleString()}
              </div>
              <div>
                <b>Outpass ID:</b> {details.outpassId}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
