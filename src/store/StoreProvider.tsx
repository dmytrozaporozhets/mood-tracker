import React, { createContext, useContext } from "react";
import { RootStore } from "./RootStore";

const StoreContext = createContext<RootStore | null>(null);

const store = new RootStore();

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};
