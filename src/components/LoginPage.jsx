import React, { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("security"); // Default to security

  const ADMIN_CREDENTIALS = {
    "adminapplied": { password: "admin123", faculty: "Applied Science" },
    "adminbussiness": { password: "admin123", faculty: "Business Studies" },
    "admintech": { password: "admin123", faculty: "Technology" },
    "admin": { password: "admin123", faculty: null } // Generic admin
  };

  const SECURITY_CREDENTIALS = {
    "security": { password: "security123" }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (role === "admin") {
      // Admin Login Logic
      if (ADMIN_CREDENTIALS[username] && ADMIN_CREDENTIALS[username].password === password) {
        const faculty = ADMIN_CREDENTIALS[username].faculty;
        const userData = { username, role: "admin", faculty };
        localStorage.setItem("token", "mock-admin-token");
        localStorage.setItem("user", JSON.stringify(userData));
        onLogin(userData);
      } else {
        alert("Invalid Admin Credentials");
      }
    } else {
      // Security Login Logic
      if (SECURITY_CREDENTIALS[username] && SECURITY_CREDENTIALS[username].password === password) {
        const userData = { username, role: "security" };
        localStorage.setItem("token", "mock-security-token");
        localStorage.setItem("user", JSON.stringify(userData));
        onLogin(userData);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          const userData = { username: data.email, role: data.role };
          localStorage.setItem("user", JSON.stringify(userData));
          onLogin(userData);
        } else {
          alert(data.message || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Vehicle & Gate Pass System</h2>

        <div className="form-group">
          <label>Select Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="role-select"
            style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          >
            <option value="security">Security</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Username or Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
