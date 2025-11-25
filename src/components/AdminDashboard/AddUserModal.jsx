import React, { useState, useEffect } from "react";
import "./AddUserModal.css";

export default function AddUserModal({
  isOpen,
  onClose,
  onAddOfficer,
  editingOfficer,
}) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gate, setGate] = useState("Main Gate");

  useEffect(() => {
    if (editingOfficer) {
      setFullName(editingOfficer.name);
      setGate(editingOfficer.gate);
    } else {
      setFullName("");
      setUsername("");
      setPassword("");
      setGate("Main Gate");
    }
  }, [editingOfficer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddOfficer({ fullName, username, password, gate });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>
          {editingOfficer ? "Edit Security Officer" : "Add New Security Officer"}
        </h3>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          {!editingOfficer && (
            <>
              <div>
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <div>
            <label>Gate Assignment</label>
            <select value={gate} onChange={(e) => setGate(e.target.value)}>
              <option>Main Gate</option>
              <option>Side Gate</option>
              <option>Back Gate</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="add-btn">
              {editingOfficer ? "Save Changes" : "Add Officer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
