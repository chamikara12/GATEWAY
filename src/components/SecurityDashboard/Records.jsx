// Place this file inside: src/components/SecurityDashboard/Records.jsx
import React from "react";
import "./Records.css";

export default function Records() {
  const records = [
    {
      vehicle: "ABC-1234",
      driver: "John Perera",
      entry: "09:30 AM",
      exit: "-",
      status: "Inside",
      statusType: "inside",
    },
    {
      vehicle: "XYZ-5678",
      driver: "Saman Silva",
      entry: "08:15 AM",
      exit: "11:45 AM",
      status: "Exited",
      statusType: "exited",
    },
  ];

  return (
    <div className="records-section">
      <div className="records-container">
        <div className="records-header">
          <h3>Today's Vehicle Records</h3>
          <p>All vehicle entries and exits for today</p>
        </div>

        <div className="table-container">
          <table className="records-table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Driver</th>
                <th>Entry</th>
                <th>Exit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={index}>
                  <td>{record.vehicle}</td>
                  <td>{record.driver}</td>
                  <td>{record.entry}</td>
                  <td>{record.exit}</td>
                  <td>
                    <span className={`status ${record.statusType}`}>{record.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
