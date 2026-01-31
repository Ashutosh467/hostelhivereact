import React from "react";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="container">
      <Topbar />
      {children}
    </div>
  );
}
