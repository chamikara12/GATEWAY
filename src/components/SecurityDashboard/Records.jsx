// Place this file inside: src/components/SecurityDashboard/Records.jsx
import React, { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./Records.css";

export default function Records() {
  const [records, setRecords] = useState([]);
  const printRef = useRef();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch("http://localhost:5000/vehicleRecord");
        const data = await response.json();
        setRecords(data.map(r => ({
          id: r.passId || Math.random().toString(),
          vehicle: r.vehicleNumber,
          driver: r.driverName,
          entry: r.inTime || r.time,
          exit: r.outTime || "-",
          status: r.outTime ? "Exited" : "Inside",
          statusType: r.outTime ? "exited" : "inside",
          faculty: r.faculty || "Applied Science", // Mock faculty if missing
          approvalStatus: "Approved" // Mock approval status
        })));
      } catch (error) {
        console.error("Failed to fetch records", error);
      }
    };

    fetchRecords();
  }, []);

  const handlePrint = (record) => {
    if (record.approvalStatus === "Pending Approval") {
      alert("Cannot print. Waiting for Admin approval.");
      return;
    }

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Gate Pass - ${record.vehicle}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; text-align: center; border: 2px solid #333; margin: 20px; }
            h2 { color: #333; }
            .details { text-align: left; margin: 20px auto; width: 80%; }
            .qr-code { margin-top: 20px; }
            .status-badge { padding: 5px 10px; border-radius: 4px; background: #28a745; color: white; display: inline-block; }
          </style>
        </head>
        <body>
          <h2>University of Vavuniya - Gate Pass</h2>
          <div class="details">
            <p><strong>Vehicle Number:</strong> ${record.vehicle}</p>
            <p><strong>Driver Name:</strong> ${record.driver}</p>
            <p><strong>Faculty:</strong> ${record.faculty}</p>
            <p><strong>Entry Time:</strong> ${record.entry}</p>
            <p><strong>Status:</strong> <span class="status-badge">${record.approvalStatus}</span></p>
          </div>
          <div class="qr-code" id="qrcode"></div>
          <script>
            // Simple placeholder for QR code in print view since we can't easily transfer the canvas
            document.getElementById('qrcode').innerHTML = "Scan for details";
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

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
                <th>Faculty</th>
                <th>Entry</th>
                <th>Status</th>
                <th>Approval</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={index}>
                  <td>{record.vehicle}</td>
                  <td>{record.driver}</td>
                  <td>{record.faculty}</td>
                  <td>{record.entry}</td>
                  <td>
                    <span className={`status ${record.statusType}`}>{record.status}</span>
                  </td>
                  <td>
                    <span style={{
                      color: record.approvalStatus === "Approved" ? "green" : "orange",
                      fontWeight: "bold"
                    }}>
                      {record.approvalStatus}
                    </span>
                  </td>
                  <td>
                    <button
                      className="print-btn"
                      onClick={() => handlePrint(record)}
                      style={{ opacity: record.approvalStatus === "Pending Approval" ? 0.5 : 1 }}
                    >
                      Print
                    </button>
                    <div style={{ display: "none" }}>
                      <QRCodeCanvas value={JSON.stringify(record)} />
                    </div>
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
