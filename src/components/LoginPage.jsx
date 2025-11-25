import React, { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Validate credentials
    const credentials = {
      admin: { username: "admin", password: "admin123" },
      security: { username: "security", password: "sec123" },
    };

    if (
      username === credentials[role].username &&
      password === credentials[role].password
    ) {
      // Successful login
      onLogin({ username, role });
    } else {
      alert("Invalid username or password for selected role");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Vehicle & Gate Pass System</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="security">Security</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
