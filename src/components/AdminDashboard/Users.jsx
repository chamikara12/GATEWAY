import React, { useState, useEffect } from "react";
import "./Users.css";
import AddUserModal from "./AddUserModal";

export default function Users({ faculty }) {
  const [officers, setOfficers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOfficer, setEditingOfficer] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchOfficers();
  }, []);

  const fetchOfficers = async () => {
    try {
      const response = await fetch("http://localhost:5000/user");
      const data = await response.json();
      setOfficers(data.map(u => ({
        name: u.name,
        gate: u.gate || "Main Gate",
        activeSince: "Jan 2024", // Placeholder
        email: u.email,
        faculty: u.faculty || "Applied Science" // Mock faculty if missing
      })));
    } catch (error) {
      console.error("Failed to fetch officers", error);
    }
  };

  // Filter officers by faculty
  const filteredOfficers = faculty
    ? officers.filter(o => o.faculty === faculty)
    : officers;

  // ✅ Add or update officer
  const handleAddOrEditOfficer = async (officerData) => {
    try {
      if (editingOfficer) {
        // Update
        await fetch(`http://localhost:5000/user/${editingOfficer.email}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: officerData.fullName,
            gate: officerData.gate
          }),
        });
      } else {
        // Add
        await fetch("http://localhost:5000/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: Date.now().toString(),
            name: officerData.fullName,
            email: officerData.username,
            password: officerData.password,
            role: "security",
            gate: officerData.gate,
            faculty: faculty // Assign to current faculty
          }),
        });
      }
      fetchOfficers();
      setIsModalOpen(false);
      setEditingOfficer(null);
      setEditIndex(null);
    } catch (error) {
      console.error("Error saving officer", error);
      alert("Failed to save officer");
    }
  };

  // ✅ Remove officer
  const handleRemoveOfficer = async (index) => {
    const officer = filteredOfficers[index];
    if (window.confirm("Are you sure you want to remove this officer?")) {
      try {
        await fetch(`http://localhost:5000/user/${officer.email}`, {
          method: "DELETE",
        });
        fetchOfficers();
      } catch (error) {
        console.error("Error deleting officer", error);
      }
    }
  };

  // ✅ Open modal for editing
  const handleEditOfficer = (index) => {
    const officer = filteredOfficers[index];
    setEditingOfficer(officer);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="users-section">
      <div className="users-container">
        <div className="users-header">
          <div>
            <h3>Manage Security Officers {faculty && `- ${faculty}`}</h3>
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
          {filteredOfficers.length === 0 ? (
            <p>No officers available for {faculty}.</p>
          ) : (
            filteredOfficers.map((officer, index) => (
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
