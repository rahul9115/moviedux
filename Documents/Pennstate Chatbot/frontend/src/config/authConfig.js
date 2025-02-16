export const msalConfig = {
    auth: {
      clientId: "",
      authority: ""
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false,
    }
  };
  
  export const loginRequest = {
    scopes: ["User.Read"]
  }; 