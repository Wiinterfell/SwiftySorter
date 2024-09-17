import React, { createContext } from "react";

export const ClientContext = createContext({
  supabaseClient: null,
})

export const useClientContext = () => {
  const context = React.useContext(ClientContext);
  if (!context) {
    throw new Error("useClientContext must be used within a ClientContext.Provider");
  }
  return context;
}