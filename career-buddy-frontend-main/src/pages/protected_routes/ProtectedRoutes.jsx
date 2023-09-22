//libraries
import { Navigate, Outlet, useLocation } from "react-router-dom";

// contexts
// import AdminContextProvider from "@contexts/AdminContext";
import useAuth from "@hooks/useAuth";
import Unauthorized from "@pages/errors/unauthorized/Unauthorized";

const ProtectedRoutes = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Unauthorized />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
