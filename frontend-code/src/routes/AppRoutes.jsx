import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/authpages/Login";
import Register from "../pages/authpages/Register";
import Dashboard from "../pages/dashboard/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default AppRoutes;