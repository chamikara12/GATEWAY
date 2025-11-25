// Place this file inside: src/components/SecurityDashboard/VehicleExit.jsx
import React, { useState } from "react";
import "./VehicleExit.css";

export default function VehicleExit() {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [exitTime, setExitTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleExitSubmit = (e) => {
    e.preventDefault();
    alert(`Vehicle: ${vehicleNumber}\nExit Time: ${exitTime}\nNotes: ${notes}`);
    // Add your actual submission logic here
    setVehicleNumber("");
    setExitTime("");
    setNotes("");
  };

  // Sample approved passes data
  const approvedPasses = [
    {
      title: "Equipment Transport",
      approvedBy: "Dr. Fernando",
      items: "Laboratory Equipment",
      vehicle: "ABC-1234",
      validUntil: "6:00 PM",
    },
    {
      title: "Office Supplies",
      approvedBy: "Admin Office",
      items: "Stationery, Files",
      vehicle: "XYZ-5678",
      validUntil: "4:00 PM",
    },
  ];

  return (
    <div className="vehicle-exit-section">
      {/* Vehicle Exit Form */}
      <div className="vehicle-exit-container">
        <h3>Record Vehicle Exit</h3>
        <form className="vehicle-exit-form" onSubmit={handleExitSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Vehicle Number</label>
              <input
                type="text"
                placeholder="e.g., ABC-1234"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                required
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label>Exit Time</label>
              <input
                type="datetime-local"
                value={exitTime}
                onChange={(e) => setExitTime(e.target.value)}
                required
                className="input-field"
              />
            </div>
          </div>

          <div className="form-group full-span">
            <label>Exit Notes</label>
            <textarea
              rows="3"
              placeholder="Any notes about the exit"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input-field"
            ></textarea>
          </div>

          <div className="form-group full-span">
            <button type="submit" className="btn-submit">
              Record Exit
            </button>
          </div>
        </form>
      </div>

      {/* Approved Passes Section */}
      <div className="approved-passes-container">
        <div className="approved-header">
          <h3>Approved Gate Passes</h3>
          <p>View all approved gate passes for today</p>
        </div>
        <div className="approved-list">
          {approvedPasses.map((pass, index) => (
            <div key={index} className="approved-pass">
              <div className="pass-info">
                <h4>{pass.title}</h4>
                <p>Approved by: {pass.approvedBy}</p>
                <p>Items: {pass.items}</p>
                <p>Vehicle: {pass.vehicle}</p>
              </div>
              <div className="pass-status">
                <span className="status-badge">Approved</span>
                <p className="valid-time">Valid until {pass.validUntil}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
