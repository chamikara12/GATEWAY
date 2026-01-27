// Place this file inside: src/components/SecurityDashboard/VehicleEntry.jsx
import React, { useState } from "react";
import "./VehicleEntry.css";

export default function VehicleEntry() {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    driverName: "",
    idNumber: "",
    license: "",
    contact: "",
    purpose: "Official Business",
    entryTime: "",
    notes: "",
    carriedEquipment: "", // Added Equipment field
    vehicleType: "Car",
    to: "Main Building",
    faculty: "Applied Science"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine status based on equipment
    const status = formData.carriedEquipment.trim() ? "Pending Approval" : "Approved";

    try {
      await fetch("http://localhost:5000/vehicleRecord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passId: Date.now().toString(),
          data: new Date(),
          time: formData.entryTime,
          vehicleNumber: formData.vehicleNumber,
          vehicleType: formData.vehicleType,
          driverName: formData.driverName,
          idNumber: formData.idNumber,
          purpose: formData.purpose,
          to: formData.to,
          license: formData.license,
          contact: formData.contact,
          notes: formData.notes,
          carriedEquipment: formData.carriedEquipment, // Include equipment
          inTime: formData.entryTime,
          faculty: formData.faculty,
          approvalStatus: status // Set status
        })
      });

      const message = status === "Pending Approval"
        ? "Vehicle Entry Recorded. Status: PENDING APPROVAL (Equipment Declared)."
        : "Vehicle Entry Recorded. Status: APPROVED.";

      alert(message);

      setFormData({
        vehicleNumber: "",
        driverName: "",
        idNumber: "",
        license: "",
        contact: "",
        purpose: "Official Business",
        entryTime: "",
        notes: "",
        carriedEquipment: "",
        vehicleType: "Car",
        to: "Main Building",
        faculty: "Applied Science"
      });
    } catch (error) {
      console.error("Error recording entry", error);
      alert("Failed to record entry");
    }
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
            <label>Vehicle Type</label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="input-field"
            >
              <option>Car</option>
              <option>Bike</option>
              <option>Truck</option>
              <option>Van</option>
              <option>Other</option>
            </select>
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
            <label>Driver ID / NIC</label>
            <input
              type="text"
              name="idNumber"
              placeholder="Enter ID number"
              value={formData.idNumber}
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
            <label>Destination (To)</label>
            <input
              type="text"
              name="to"
              placeholder="Destination"
              value={formData.to}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>Approving Faculty</label>
            <select
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              className="input-field"
            >
              <option>Applied Science</option>
              <option>Business Studies</option>
              <option>Technology</option>
            </select>
          </div>

          <div className="form-group full-span">
            <label>Carried Equipment / University Property</label>
            <input
              type="text"
              name="carriedEquipment"
              placeholder="Describe equipment (leave empty if none)"
              value={formData.carriedEquipment}
              onChange={handleChange}
              className="input-field"
              style={{ borderColor: formData.carriedEquipment ? "#ffc107" : "#ddd" }}
            />
            {formData.carriedEquipment && (
              <small style={{ color: "#856404", display: "block", marginTop: "5px" }}>
                ⚠ Declaring equipment will require Admin Approval before printing.
              </small>
            )}
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
