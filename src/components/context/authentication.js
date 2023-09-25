import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("Token")) {
      setToken(localStorage.getItem("Token"));
    }
  },[]);

  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}
