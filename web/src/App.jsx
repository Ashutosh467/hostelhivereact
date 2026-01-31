import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentOutpass from "./pages/student/StudentOutpass";

import WardenDashboard from "./pages/staff/WardenDashboard";
import GuardDashboard from "./pages/staff/GuardDashboard";

// ✅ Modules (Student Side)
import MessDashboard from "./pages/modules/MessDashboard";
import Gym from "./pages/modules/Gym";
import Sports from "./pages/modules/Sports";
import Hospital from "./pages/modules/Hospital";
import Maintenance from "./pages/modules/Maintenance";
import VisitorPass from "./pages/modules/VisitorPass";
import MedicalHelp from "./pages/modules/MedicalHelp";
import LostFound from "./pages/modules/LostFound";
import Chatbot from "./pages/modules/Chatbot";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Student */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* ⚠️ OUTPASS MODULE (DON'T TOUCH) */}
        <Route path="/student/outpass" element={<StudentOutpass />} />

        {/* Student Modules */}
        <Route path="/student/mess" element={<MessDashboard />} />
        <Route path="/student/gym" element={<Gym />} />
        <Route path="/student/sports" element={<Sports />} />
        <Route path="/student/hospital" element={<Hospital />} />
        <Route path="/student/maintenance" element={<Maintenance />} />
        <Route path="/student/visitor-pass" element={<VisitorPass />} />
        <Route path="/student/medical-help" element={<MedicalHelp />} />
        <Route path="/student/lost-found" element={<LostFound />} />
        <Route path="/student/chatbot" element={<Chatbot />} />

        {/* Staff */}
        <Route path="/staff/warden" element={<WardenDashboard />} />
        <Route path="/staff/guard" element={<GuardDashboard />} />

        {/* Fallback */}
        <Route
          path="*"
          element={<div style={{ padding: 20 }}>404 Not Found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}
