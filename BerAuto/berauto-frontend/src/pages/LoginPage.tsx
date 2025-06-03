import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { login, UserLoginDto, LoginResponse } from "../api/auth";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { login: authLogin } = useContext(AuthContext);
  const [credentials, setCredentials] = useState<UserLoginDto>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: LoginResponse = await login(credentials);
      authLogin(response.token, response.user);
      navigate("/cars");
    } catch (err: any) {
      setError(err.response?.data?.message || "Hibás email vagy jelszó");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#111" }}>
      <div className="card" style={{ minWidth: 340, maxWidth: 400, width: "100%" }}>
        <h2 style={{ textAlign: "center", marginBottom: 24, color: '#b388ff', fontWeight: 700 }}>Bejelentkezés</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500 }}>Email:</label>
            <input
              className="login-input"
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500 }}>Jelszó:</label>
            <input
              className="login-input"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>
          {error && (
            <div className="error" style={{ textAlign: "center", marginTop: 12, marginBottom: 0 }}>{error}</div>
          )}
          <button type="submit" style={{ width: "100%", marginTop: 18 }}>Bejelentkezés</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;