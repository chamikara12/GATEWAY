import React, { useState, useEffect } from "react";
import Overview from "./Overview";
import GatePasses from "./GatePasses";
import Vehicles from "./Vehicles";
import Users from "./Users";
import Reports from "./Reports";
import AddUserModal from "./AddUserModal";
import "./AdminDashboard.css"; // Ensure CSS exists or create it

export default function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(user.faculty);
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(!user.faculty);

  const [officers, setOfficers] = useState([
    { fullName: "Officer Rajesh", gate: "Main Gate" },
    { fullName: "Officer Kumari", gate: "Side Gate" },
  ]);

  const handleAddOfficer = (officer) => {
    setOfficers([...officers, officer]);
  };

  const handleFacultySelect = (faculty) => {
    setSelectedFaculty(faculty);
    setIsFacultyModalOpen(false);
    // Optionally persist to localStorage if needed for refresh
    const updatedUser = { ...user, faculty };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return <Overview faculty={selectedFaculty} />;
      case "gatepasses":
        return <GatePasses faculty={selectedFaculty} />;
      case "vehicles":
        return <Vehicles faculty={selectedFaculty} />;
      case "users":
        return (
          <Users
            officers={officers}
            onAddClick={() => setIsAddUserModalOpen(true)}
            faculty={selectedFaculty}
          />
        );
      case "reports":
        return <Reports faculty={selectedFaculty} />;
      default:
        return <Overview faculty={selectedFaculty} />;
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
        {/* Top Header */}
        <header className="admin-header" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          background: "#fff",
          borderBottom: "1px solid #ddd",
          marginBottom: "20px"
        }}>
          <h2>Dashboard</h2>
          <div className="faculty-display" style={{ fontWeight: "bold", color: "#007bff" }}>
            {selectedFaculty ? `Faculty of ${selectedFaculty}` : "Select Faculty"}
          </div>
        </header>

        {renderTab()}

        {/* Add User Modal */}
        <AddUserModal
          isOpen={isAddUserModalOpen}
          onClose={() => setIsAddUserModalOpen(false)}
          onAddOfficer={handleAddOfficer}
        />

        {/* Faculty Selection Modal */}
        {isFacultyModalOpen && (
          <div className="modal-overlay" style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
            justifyContent: "center", alignItems: "center", zIndex: 1000
          }}>
            <div className="modal-content" style={{
              background: "white", padding: "20px", borderRadius: "8px",
              width: "300px", textAlign: "center"
            }}>
              <h3>Select Faculty</h3>
              <p>Please select your faculty to proceed.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button onClick={() => handleFacultySelect("Applied Science")}>Applied Science</button>
                <button onClick={() => handleFacultySelect("Business Studies")}>Business Studies</button>
                <button onClick={() => handleFacultySelect("Technology")}>Technology</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
