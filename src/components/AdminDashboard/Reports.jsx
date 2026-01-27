// Place this file inside: src/components/AdminDashboard/Reports.jsx
import React, { useState } from "react";
import "./Reports.css";

export default function Reports() {
  const [month, setMonth] = useState("December 2024");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const generateMonthlyReport = () => {
    alert(`Generating monthly report for ${month}`);
    // Replace with your actual report logic
  };

  const generateCustomReport = () => {
    alert(`Generating custom report from ${fromDate} to ${toDate}`);
    // Replace with your actual report logic
  };

  return (
    <div className="reports-section">
      <div className="reports-container">
        <div className="reports-header">
          <h3>Generate Reports</h3>
          <p>Create monthly and custom reports</p>
        </div>

        <div className="reports-body">
          <div className="report-card">
            <h4>Monthly Report</h4>
            <div className="report-form">
              <div className="form-group">
                <label>Select Month</label>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="input-field"
                >
                  <option>December 2024</option>
                  <option>November 2024</option>
                  <option>October 2024</option>
                </select>
              </div>
              <button className="btn btn-blue" onClick={generateMonthlyReport}>
                Generate Monthly Report
              </button>
            </div>
          </div>

          <div className="report-card">
            <h4>Custom Report</h4>
            <div className="report-form">
              <div className="form-group">
                <label>From Date</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label>To Date</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="input-field"
                />
              </div>
              <button className="btn btn-green" onClick={generateCustomReport}>
                Generate Custom Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
