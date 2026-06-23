import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";

import MainLayout from "../layouts/MainLayout";

import LoginPage from '../pages/LoginPage';
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ManagementPage from "../modules/management/pages/ManagementPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected App Routes */}
        <Route path="/" element={<ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/management" element={<ManagementPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};
export default AppRoutes;