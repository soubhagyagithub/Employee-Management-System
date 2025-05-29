import React, { useContext } from "react";
import EmployeeList from "../components/EmployeeList";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function EmployeePage() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isLoggedIn) return <Navigate to="/login" />;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary ">Employee Management System</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <EmployeeList />
    </div>
  );
}
