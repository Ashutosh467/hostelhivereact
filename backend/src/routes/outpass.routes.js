import express from "express";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";
import Outpass from "../models/Outpass.js";
import ScanLog from "../models/ScanLog.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

/**
 * STUDENT: Create outpass request
 * POST /api/outpass/request
 */
router.post("/request", authMiddleware(["STUDENT"]), async (req, res) => {
  try {
    const { reason, destination, fromTime, toTime } = req.body;

    const outpass = await Outpass.create({
      student: req.user.id,
      reason,
      destination,
      fromTime,
      toTime,
      status: "PENDING",
      qrToken: "",
      qrImage: "",
      scanCountAllowed: 2,
      scanCountUsed: 0,
    });

    res.json({ message: "Outpass requested", outpass });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * STUDENT: My requests
 * GET /api/outpass/my
 */
router.get("/my", authMiddleware(["STUDENT"]), async (req, res) => {
  try {
    const list = await Outpass.find({ student: req.user.id })
      .sort({ createdAt: -1 })
      .populate("approvedBy", "name userId role");

    res.json({ list });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * WARDEN/HEAD: Get pending outpasses
 * GET /api/outpass/pending
 */
router.get(
  "/pending",
  authMiddleware(["WARDEN", "HEAD", "ADMIN"]),
  async (req, res) => {
    try {
      const list = await Outpass.find({ status: "PENDING" })
        .sort({ createdAt: -1 })
        .populate("student", "name userId role hostel floor");

      res.json({ list });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

/**
 * WARDEN/HEAD: Get approved outpasses
 * GET /api/outpass/approved
 */
router.get(
  "/approved",
  authMiddleware(["WARDEN", "HEAD", "ADMIN"]),
  async (req, res) => {
    try {
      const list = await Outpass.find({ status: "APPROVED" })
        .sort({ updatedAt: -1 })
        .populate("student", "name userId role hostel floor")
        .populate("approvedBy", "name userId role");

      res.json({ list });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

/**
 * WARDEN/HEAD: Get rejected outpasses
 * GET /api/outpass/rejected
 */
router.get(
  "/rejected",
  authMiddleware(["WARDEN", "HEAD", "ADMIN"]),
  async (req, res) => {
    try {
      const list = await Outpass.find({ status: "REJECTED" })
        .sort({ updatedAt: -1 })
        .populate("student", "name userId role hostel floor")
        .populate("approvedBy", "name userId role");

      res.json({ list });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

/**
 * WARDEN/HEAD: Approve outpass + generate QR
 * POST /api/outpass/:id/approve
 */
router.post(
  "/:id/approve",
  authMiddleware(["WARDEN", "HEAD", "ADMIN"]),
  async (req, res) => {
    try {
      const outpass = await Outpass.findById(req.params.id).populate(
        "student",
        "name userId hostel floor",
      );

      if (!outpass)
        return res.status(404).json({ message: "Outpass not found" });

      outpass.status = "APPROVED";
      outpass.approvedBy = req.user.id;

      // QR token (valid 2 days)
      const qrToken = jwt.sign(
        { outpassId: outpass._id.toString() },
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
      );

      outpass.qrToken = qrToken;

      // QR Image generate + save in DB
      const qrImage = await QRCode.toDataURL(qrToken);
      outpass.qrImage = qrImage;

      await outpass.save();

      res.json({
        message: "Approved + QR generated",
        outpass,
        qrImage,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

/**
 * WARDEN/HEAD: Reject outpass
 * POST /api/outpass/:id/reject
 */
router.post(
  "/:id/reject",
  authMiddleware(["WARDEN", "HEAD", "ADMIN"]),
  async (req, res) => {
    try {
      const outpass = await Outpass.findById(req.params.id).populate(
        "student",
        "name userId hostel floor",
      );

      if (!outpass)
        return res.status(404).json({ message: "Outpass not found" });

      outpass.status = "REJECTED";
      outpass.approvedBy = req.user.id;
      outpass.qrToken = "";
      outpass.qrImage = "";

      await outpass.save();

      res.json({
        message: "Outpass rejected",
        outpass,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

/**
 * GUARD: Scan QR OUT/IN (2 scans only)
 * POST /api/outpass/scan
 * Body: { qrToken }
 */
router.post("/scan", authMiddleware(["GUARD"]), async (req, res) => {
  try {
    const { qrToken } = req.body;
    if (!qrToken) return res.status(400).json({ message: "qrToken required" });

    let decoded;
    try {
      decoded = jwt.verify(qrToken, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ message: "Invalid/Expired QR" });
    }

    const outpass = await Outpass.findById(decoded.outpassId).populate(
      "student",
      "name userId hostel floor",
    );

    if (!outpass) return res.status(404).json({ message: "Outpass not found" });

    const now = new Date();

    // time validity
    if (now < outpass.fromTime || now > outpass.toTime) {
      await ScanLog.create({
        outpass: outpass._id,
        scannedBy: req.user.id,
        type: "DENIED",
        note: "Time invalid",
      });
      return res.status(403).json({ message: "Denied: Time invalid" });
    }

    // scan limit
    if (outpass.scanCountUsed >= outpass.scanCountAllowed) {
      await ScanLog.create({
        outpass: outpass._id,
        scannedBy: req.user.id,
        type: "DENIED",
        note: "Scan limit reached",
      });
      return res.status(403).json({ message: "Denied: Scan limit reached" });
    }

    let scanType = "OUT";
    if (outpass.scanCountUsed === 1) scanType = "IN";

    outpass.scanCountUsed += 1;
    outpass.status = scanType === "OUT" ? "OUT" : "IN";
    await outpass.save();

    await ScanLog.create({
      outpass: outpass._id,
      scannedBy: req.user.id,
      type: scanType,
      note: "Scan success",
    });

    res.json({
      message: `Scan success: ${scanType}`,
      scanType,
      outpassStatus: outpass.status,
      scanCountUsed: outpass.scanCountUsed,
      details: {
        outpassId: outpass._id,
        reason: outpass.reason,
        destination: outpass.destination,
        fromTime: outpass.fromTime,
        toTime: outpass.toTime,
        student: {
          name: outpass.student.name,
          userId: outpass.student.userId,
          hostel: outpass.student.hostel,
          floor: outpass.student.floor,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GUARD: Verify using Code (Outpass ID)
 * POST /api/outpass/verify-code
 * Body: { outpassId }
 */
router.post("/verify-code", authMiddleware(["GUARD"]), async (req, res) => {
  try {
    const { outpassId } = req.body;
    if (!outpassId)
      return res.status(400).json({ message: "outpassId required" });

    const outpass = await Outpass.findById(outpassId).populate(
      "student",
      "name userId hostel floor",
    );

    if (!outpass) return res.status(404).json({ message: "Outpass not found" });

    res.json({
      message: "Outpass found",
      details: {
        outpassId: outpass._id,
        status: outpass.status,
        reason: outpass.reason,
        destination: outpass.destination,
        fromTime: outpass.fromTime,
        toTime: outpass.toTime,
        scanCountUsed: outpass.scanCountUsed,
        scanCountAllowed: outpass.scanCountAllowed,
        student: {
          name: outpass.student.name,
          userId: outpass.student.userId,
          hostel: outpass.student.hostel,
          floor: outpass.student.floor,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
