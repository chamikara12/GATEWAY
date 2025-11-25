import React from "react";
import "./GatePasses.css";

function GatePasses() {
  const approveGatePass = (id) => {
    alert(`Gate Pass ${id} approved!`);
  };

  const rejectGatePass = (id) => {
    alert(`Gate Pass ${id} rejected!`);
  };

  return (
    <div id="admin-gatepasses" className="admin-section">
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Gate Pass Management</h3>
          <p>Review and approve gate pass requests</p>
        </div>

        <div className="admin-card-body">
          {/* First Gate Pass */}
          <div className="gatepass-item">
            <div className="gatepass-info">
              <h4>Equipment Transport Request</h4>
              <p>Requested by: Dr. Silva | Department: Engineering</p>
              <p>Items: Laboratory Equipment, Computers</p>
              <p>Destination: Main Campus</p>
            </div>
            <div className="gatepass-actions">
              <button className="approve-btn" onClick={() => approveGatePass(1)}>
                ✓ Approve
              </button>
              <button className="reject-btn" onClick={() => rejectGatePass(1)}>
                ✗ Reject
              </button>
            </div>
          </div>

          {/* Second Gate Pass */}
          <div className="gatepass-item">
            <div className="gatepass-info">
              <h4>Furniture Movement</h4>
              <p>Requested by: Admin Office | Department: Administration</p>
              <p>Items: Office Chairs, Desks</p>
              <p>Destination: New Building</p>
            </div>
            <div className="gatepass-actions">
              <button className="approve-btn" onClick={() => approveGatePass(2)}>
                ✓ Approve
              </button>
              <button className="reject-btn" onClick={() => rejectGatePass(2)}>
                ✗ Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GatePasses;
