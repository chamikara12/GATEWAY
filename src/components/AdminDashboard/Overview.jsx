// Place this file inside: src/components/AdminDashboard/Overview.jsx
import React from "react";
import "./Overview.css";

export default function Overview() {

  const stats = [
    {
      title: "Pending Gate Passes",
      value: 12,
      iconColor: "blue",
      bgColor: "bg-blue",
      svgPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    },
    {
      title: "Approved Today",
      value: 28,
      iconColor: "green",
      bgColor: "bg-green",
      svgPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
      title: "Vehicle Entries",
      value: 156,
      iconColor: "purple",
      bgColor: "bg-purple",
      svgPath: "M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
    },
    {
      title: "Security Officers",
      value: 8,
      iconColor: "orange",
      bgColor: "bg-orange",
      svgPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    }
  ];

  const recentActivities = [
    { color: "green", text: "Gate pass approved for Equipment Transport", time: "2 minutes ago" },
    { color: "blue", text: "Vehicle ABC-1234 entered premises", time: "5 minutes ago" },
    { color: "yellow", text: "New gate pass request submitted", time: "8 minutes ago" },
  ];

  return (
    <div className="overview-section">
      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className={`icon ${stat.bgColor}`}>
              <svg className={`icon-svg ${stat.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.svgPath}></path>
              </svg>
            </div>
            <div className="stat-info">
              <p className="stat-title">{stat.title}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="recent-activity-card">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {recentActivities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-text">
                <span className={`activity-dot ${activity.color}`}></span>
                <span>{activity.text}</span>
              </div>
              <span className="activity-time">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
