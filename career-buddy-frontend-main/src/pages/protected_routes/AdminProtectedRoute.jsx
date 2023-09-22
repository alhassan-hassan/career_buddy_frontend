//libraries
import { Navigate, Outlet } from "react-router-dom";

// contexts
import AdminContextProvider from "@contexts/AdminContext";

const AdminProtectedRoute = () => {
  //getting admin from state management, but null for now
  const admin = true;

  return (
    <>
      {admin ? (
        <AdminContextProvider>
          <Outlet />
        </AdminContextProvider>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default AdminProtectedRoute;
