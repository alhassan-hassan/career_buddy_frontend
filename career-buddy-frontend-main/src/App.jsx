// libraries
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Home from "@pages/home/Home";
import Login from "@pages/auth/login/Login";
import Register from "@pages/auth/register/Register";
import Print from "@pages/student/student_components/print/Print";
import PageNotFound from "@pages/errors/page_not_found/PageNotFound";
import Admin from "@pages/admin/Admin";
import Student from "@pages/student/Student";
import Cpa from "@pages/cpa/Cpa";
import ProtectedRoutes from "@pages/protected_routes/ProtectedRoutes";
import ForgotPassword from "@pages/auth/forgot_password/ForgotPassword";
import ResetPassword from "@pages/auth/reset_password/ResetPassword";

// utils
import {
  HOME_PAGE,
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  ADMIN,
  PAGE_NOT_FOUND,
  STUDENT,
  CPA,
  PRINT,
} from "@utils/routes";

// contexts
import AppContextProvider from "@contexts/AppContext";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path={HOME_PAGE} element={<Home />} />
          <Route path={LOGIN} element={<Login />} />
          <Route path={REGISTER} element={<Register />} />
          <Route path={FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={PRINT} element={<Print />} />
          <Route element={<ProtectedRoutes allowedRoles={["student"]} />}>
            <Route path={STUDENT} element={<Student />} />
          </Route>
          <Route
            element={<ProtectedRoutes allowedRoles={["student", "cpa"]} />}
          >
            <Route path={CPA} element={<Cpa />} />
          </Route>
          <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
            <Route path={ADMIN} element={<Admin />} />
          </Route>
          <Route path={PAGE_NOT_FOUND} element={<PageNotFound />} />
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
