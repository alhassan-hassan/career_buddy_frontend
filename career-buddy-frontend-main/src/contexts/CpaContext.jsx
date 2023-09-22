// libraries
import { createContext, useState } from "react";

export const CpaContext = createContext();

function CpaContextProvider({ children }) {
  const [cpaContextState] = useState("cpa context provider works");

  return (
    <AppContext.Provider value={{ cpaContextState }}>
      {children}
    </AppContext.Provider>
  );
}

export default CpaContextProvider;
