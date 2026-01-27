import React from "react";
import "./Vehicles.css";

export default function Vehicles() {
  return (
    <div className="vehicles-section">
      <div className="vehicles-container">
        <div className="vehicles-header">
          <h3>Vehicle Records</h3>
          <p>View all vehicle entries and exits</p>
        </div>

        <div className="table-container">
          <table className="vehicles-table">
            <thead>
              <tr>
                <th>Vehicle Number</th>
                <th>Driver Name</th>
                <th>Entry Time</th>
                <th>Exit Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ABC-1234</td>
                <td>John Perera</td>
                <td>09:30 AM</td>
                <td>-</td>
                <td>
                  <span className="status inside">Inside</span>
                </td>
              </tr>
              <tr>
                <td>XYZ-5678</td>
                <td>Saman Silva</td>
                <td>08:15 AM</td>
                <td>11:45 AM</td>
                <td>
                  <span className="status exited">Exited</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
