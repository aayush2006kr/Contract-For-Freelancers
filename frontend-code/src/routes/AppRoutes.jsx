import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/authpages/Login";
import Register from "../pages/authpages/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
     <Route
      path="/dashboard"
        element={
         <ProtectedRoute>
          <Dashboard />
            </ProtectedRoute>
        }/>
    </Routes>
  );
}

export default AppRoutes;