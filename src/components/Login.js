import React, { useState } from "react";
import "./styles/Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{isRegister ? "Criar Conta" : "Entrar"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            {isRegister ? "Criar" : "Entrar"}
          </button>

          <div className="toggle-register">
            <span
              onClick={() => setIsRegister(!isRegister)}
              style={{ cursor: "pointer", color: "#f56" }}
            >
              {isRegister
                ? "Já tem conta? Clique aqui para entrar"
                : "Não tem conta? Clique aqui para criar conta"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
