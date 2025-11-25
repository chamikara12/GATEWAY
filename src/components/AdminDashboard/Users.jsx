import React, { useState } from "react";
import "./Users.css";
import AddUserModal from "./AddUserModal";

export default function Users() {
  const [officers, setOfficers] = useState([
    { name: "Officer Rajesh", gate: "Main Gate", activeSince: "Jan 2024" },
    { name: "Officer Kumari", gate: "Side Gate", activeSince: "Mar 2024" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOfficer, setEditingOfficer] = useState(null); // store officer being edited
  const [editIndex, setEditIndex] = useState(null);

  // ✅ Add or update officer
  const handleAddOrEditOfficer = (officerData) => {
    if (editingOfficer !== null) {
      // Editing existing officer
      const updatedOfficers = [...officers];
      updatedOfficers[editIndex] = {
        ...updatedOfficers[editIndex],
        name: officerData.fullName,
        gate: officerData.gate,
      };
      setOfficers(updatedOfficers);
      setEditingOfficer(null);
      setEditIndex(null);
    } else {
      // Adding new officer
      const newOfficerData = {
        name: officerData.fullName,
        gate: officerData.gate,
        activeSince: new Date().toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
      };
      setOfficers([...officers, newOfficerData]);
    }
  };

  // ✅ Remove officer
  const handleRemoveOfficer = (index) => {
    if (window.confirm("Are you sure you want to remove this officer?")) {
      setOfficers(officers.filter((_, i) => i !== index));
    }
  };

  // ✅ Open modal for editing
  const handleEditOfficer = (index) => {
    const officer = officers[index];
    setEditingOfficer(officer);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="users-section">
      <div className="users-container">
        <div className="users-header">
          <div>
            <h3>Manage Security Officers</h3>
            <p>Add and manage security officer accounts</p>
          </div>
          <button
            className="add-btn"
            onClick={() => {
              setEditingOfficer(null);
              setIsModalOpen(true);
            }}
          >
            Add New Officer
          </button>
        </div>

        <div className="officers-grid">
          {officers.length === 0 ? (
            <p>No officers available.</p>
          ) : (
            officers.map((officer, index) => (
              <div key={index} className="officer-card">
                <div className="officer-info">
                  <div>
                    <h4>{officer.name}</h4>
                    <p>{officer.gate}</p>
                    <p>Active since: {officer.activeSince}</p>
                  </div>
                  <div className="officer-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditOfficer(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveOfficer(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ✅ Modal handles both Add & Edit */}
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingOfficer(null);
          setEditIndex(null);
        }}
        onAddOfficer={handleAddOrEditOfficer}
        editingOfficer={editingOfficer}
      />
    </div>
  );
}
