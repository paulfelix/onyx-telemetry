import React from "react";

export type AppContextType = {
  userData?: Record<string, any>,
  setUserData: (userData: Record<string, any>) => void,
}

export const AppContext = React.createContext<AppContextType | null>(null);
