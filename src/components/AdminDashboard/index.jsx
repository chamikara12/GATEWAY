import React, { useState } from "react";
import Overview from "./Overview";
import GatePasses from "./GatePasses";
import Vehicles from "./Vehicles";
import Users from "./Users";
import Reports from "./Reports";
import AddUserModal from "./AddUserModal";

export default function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [officers, setOfficers] = useState([
    { fullName: "Officer Rajesh", gate: "Main Gate" },
    { fullName: "Officer Kumari", gate: "Side Gate" },
  ]);

  const handleAddOfficer = (officer) => {
    setOfficers([...officers, officer]);
  };

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "gatepasses":
        return <GatePasses />;
      case "vehicles":
        return <Vehicles />;
      case "users":
        return (
          <Users
            officers={officers}
            onAddClick={() => setIsAddUserModalOpen(true)}
          />
        );
      case "reports":
        return <Reports />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h3>Admin Panel</h3>
        <ul>
          <li onClick={() => setActiveTab("overview")}>Overview</li>
          <li onClick={() => setActiveTab("gatepasses")}>Gate Passes</li>
          <li onClick={() => setActiveTab("vehicles")}>Vehicles</li>
          <li onClick={() => setActiveTab("users")}>Users</li>
          <li onClick={() => setActiveTab("reports")}>Reports</li>
        </ul>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </aside>

      <main className="main-content">
        {renderTab()}

        {/* Add User Modal */}
        <AddUserModal
          isOpen={isAddUserModalOpen}
          onClose={() => setIsAddUserModalOpen(false)}
          onAddOfficer={handleAddOfficer}
        />
      </main>
    </div>
  );
}
