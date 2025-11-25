import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import SecurityDashboard from "./components/SecurityDashboard";

export default function App() {
  const [user, setUser] = useState(null);

  function handleLogin({ username, role }) {
    setUser({ username, role });
  }

  function handleLogout() {
    setUser(null);
  }

  if (!user) return <LoginPage onLogin={handleLogin} />;

  return user.role === "admin" ? (
    <AdminDashboard user={user} onLogout={handleLogout} />
  ) : (
    <SecurityDashboard user={user} onLogout={handleLogout} />
  );
}
