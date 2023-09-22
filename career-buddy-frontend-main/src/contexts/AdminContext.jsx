//libraries
import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [adminContextSate] = useState("admin context provider works");

  return (
    <AdminContext.Provider value={{ adminContextSate }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
