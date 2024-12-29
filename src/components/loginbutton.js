import React from "react";

const LoginLogoutButton = ({ isLoggedIn, onLogin, onLogOff }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {isLoggedIn ? (
        <button
          onClick={onLogOff}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Log Off
        </button>
      ) : (
        <button
          onClick={onLogin}
          style={{
            padding: "10px 20px",
            backgroundColor: "#00c2ff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Log In
        </button>
      )}
    </div>
  );
};

export default LoginLogoutButton;
