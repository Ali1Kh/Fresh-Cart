import React, { createContext } from "react";

export const wishContext = createContext();

export default function WishContextProvider({ children }) {
  const x = "lol";
  return <wishContext.Provider value={x}>{children}</wishContext.Provider>;
}
