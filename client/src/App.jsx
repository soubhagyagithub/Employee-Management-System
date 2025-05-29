import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import EmployeePage from "./pages/EmployeePage";

import EmployeeView from "./pages/EmployeeView";
import EmployeeHistory from "./pages/EmployeeHistory";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/employees" element={<EmployeePage />} />

          <Route path="/employee/:id/view" element={<EmployeeView />} />
          <Route path="/employee/:id/history" element={<EmployeeHistory />} />

          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
