// Place this file inside: src/components/SecurityDashboard/VehicleEntry.jsx
import React, { useState } from "react";
import "./VehicleEntry.css";

export default function VehicleEntry() {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    driverName: "",
    license: "",
    contact: "",
    purpose: "Official Business",
    entryTime: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
    // Add your actual submission logic here

    // Reset form
    setFormData({
      vehicleNumber: "",
      driverName: "",
      license: "",
      contact: "",
      purpose: "Official Business",
      entryTime: "",
      notes: "",
    });
  };

  return (
    <div className="vehicle-entry-section">
      <div className="vehicle-entry-container">
        <h3>Record Vehicle Entry</h3>
        <form className="vehicle-entry-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Vehicle Number</label>
            <input
              type="text"
              name="vehicleNumber"
              placeholder="e.g., ABC-1234"
              value={formData.vehicleNumber}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>Driver Name</label>
            <input
              type="text"
              name="driverName"
              placeholder="Enter driver name"
              value={formData.driverName}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>Driver License</label>
            <input
              type="text"
              name="license"
              placeholder="License number"
              value={formData.license}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              name="contact"
              placeholder="Phone number"
              value={formData.contact}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>Purpose of Visit</label>
            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="input-field"
            >
              <option>Official Business</option>
              <option>Delivery</option>
              <option>Maintenance</option>
              <option>Visitor</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Entry Time</label>
            <input
              type="datetime-local"
              name="entryTime"
              value={formData.entryTime}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="form-group full-span">
            <label>Additional Notes</label>
            <textarea
              name="notes"
              rows="3"
              placeholder="Any additional information"
              value={formData.notes}
              onChange={handleChange}
              className="input-field"
            ></textarea>
          </div>

          <div className="form-group full-span">
            <button type="submit" className="btn-submit">
              Record Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
