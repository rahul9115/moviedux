import React, { useEffect, useState } from "react";
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar/NavBar";
// import FurnaceAuditForm from "./components/FurnaceAuditForm";
import LoginPrompt from "./components/LoginPrompt/LoginPrompt";
// import ErrorBoundary from "./components/ErrorBoundary";
// import Sidebar from "./components/sidebar/Sidebar";
import { msalConfig, loginRequest } from "./config/authConfig";
import axios from 'axios';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [user, setUser] = useState(null);
 

  useEffect(() => {
    if (!isAuthenticated) {
      instance.loginPopup(loginRequest).catch(error => {
        console.error("Login failed:", error);
      });
    }
  }, [instance, isAuthenticated]);

  useEffect(() => {
    msalInstance.initialize().then(() => {
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length === 0) {
        msalInstance.ssoSilent(loginRequest).catch(error => {
          console.error("Silent login failed:", error);
        });
        
      }
    }).catch(error => {
      console.error("Initialization failed:", error);
    });
  
  }, []);
  const getInitials = (name) => {
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.slice(0, 2).toUpperCase();
  };

  useEffect(() => {
    const accounts = instance.getAllAccounts();
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
      const name = accounts[0].name;
      // setUserName(name);
      // setInitials(getInitials(name));
    }
  }, [instance, isAuthenticated]);

  

  return (
   
      <MsalProvider instance={msalInstance}>
        <Router>
        <NavBar/>
          <div className="App">
           
            <AuthenticatedTemplate>
              <div className="content">
                {/* <Sidebar /> */}
                <div className="main-content">
                  <Routes>
                    <Route path="/" />
                  
                  </Routes>
                </div>
              </div>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <LoginPrompt />
            </UnauthenticatedTemplate>
          </div>
        </Router>
      </MsalProvider>
  
  );
}

export default App;
