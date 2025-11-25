import React, { useState } from "react";
import VehicleEntry from "./VehicleEntry";
import VehicleExit from "./VehicleExit";
import Records from "./Records";

export default function SecurityDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("entry");

  const renderTab = () => {
    switch (activeTab) {
      case "entry":
        return <VehicleEntry />;
      case "exit":
        return <VehicleExit />;
      case "records":
        return <Records />;
      default:
        return <VehicleEntry />;
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h3>Security Panel</h3>
        <ul>
          <li onClick={() => setActiveTab("entry")}>Vehicle Entry</li>
          <li onClick={() => setActiveTab("exit")}>Vehicle Exit</li>
          <li onClick={() => setActiveTab("records")}>Records</li>
        </ul>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </aside>
      <main className="main-content">{renderTab()}</main>
    </div>
  );
}
