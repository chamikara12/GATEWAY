import React, { useState, useEffect } from "react";
import "./GatePasses.css";

function GatePasses({ faculty }) {
  const [requests, setRequests] = useState([
    { id: 1, title: "Equipment Transport Request", requester: "Dr. Silva", department: "Applied Science", items: "Laboratory Equipment, Computers", destination: "Main Campus", status: "Pending" },
    { id: 2, title: "Furniture Movement", requester: "Admin Office", department: "Business Studies", items: "Office Chairs, Desks", destination: "New Building", status: "Pending" },
    { id: 3, title: "Lab Supplies", requester: "Dr. Perera", department: "Technology", items: "Chemicals, Glassware", destination: "Science Block", status: "Pending" }
  ]);

  const filteredRequests = faculty
    ? requests.filter(req => req.department === faculty && req.status === "Pending")
    : requests;

  const handleStatusChange = (id, newStatus) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    ));
    alert(`Gate Pass ${id} ${newStatus}!`);
  };

  return (
    <div id="admin-gatepasses" className="admin-section">
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Gate Pass Management {faculty && `- ${faculty}`}</h3>
          <p>Review and approve gate pass requests</p>
        </div>

        <div className="admin-card-body">
          {filteredRequests.length === 0 ? (
            <p>No pending requests for {faculty || "any faculty"}.</p>
          ) : (
            filteredRequests.map(req => (
              <div key={req.id} className="gatepass-item">
                <div className="gatepass-info">
                  <h4>{req.title}</h4>
                  <p>Requested by: {req.requester} | Department: {req.department}</p>
                  <p>Items: {req.items}</p>
                  <p>Destination: {req.destination}</p>
                </div>
                <div className="gatepass-actions">
                  <button className="approve-btn" onClick={() => handleStatusChange(req.id, "Approved")}>
                    ✓ Approve
                  </button>
                  <button className="reject-btn" onClick={() => handleStatusChange(req.id, "Rejected")}>
                    ✗ Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default GatePasses;
