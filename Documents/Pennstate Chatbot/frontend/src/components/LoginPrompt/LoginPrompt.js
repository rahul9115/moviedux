import React from "react";
import { useMsal } from "@azure/msal-react";

const LoginPrompt = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      await instance.loginPopup();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>We Are Penn State</h2>
        <p>Please sign in to access the Chat bot.</p>
        <button className="login-button" onClick={handleLogin}>Sign In</button>
      </div>
    </div>
  );
};

export default LoginPrompt; 