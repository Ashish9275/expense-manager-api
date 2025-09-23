import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Charts from "./pages/Charts";
import Register from "./Register";
import API from "./api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  // ✅ Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } catch (err) {
      alert("Login failed");
    }
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  // ✅ If not logged in → show login/register
  if (!token) {
    if (showRegister) {
      return <Register onRegistered={() => setShowRegister(false)} />;
    }

    return (
      <div className="container mt-5" style={{ maxWidth: 400 }}>
        <h2 className="mb-3">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="mt-3">
          Don’t have an account?{" "}
          <button
            className="btn btn-link p-0"
            onClick={() => setShowRegister(true)}
          >
            Register
          </button>
        </p>
      </div>
    );
  }

  // ✅ If logged in → show Navbar + Pages
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={<Dashboard token={token} onLogout={handleLogout} />}
        />
        <Route path="/history" element={<History token={token} />} />
        <Route path="/charts" element={<Charts token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
