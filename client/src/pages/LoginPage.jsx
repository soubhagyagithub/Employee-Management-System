import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/employees");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ minWidth: "320px", maxWidth: "420px", width: "100%" }}
      >
        <div className="text-center mb-3">
          <h4 className="fw-bold">Admin Portal</h4>
          <p className="text-muted mb-2" style={{ fontSize: "0.95rem" }}>
            Employee Management System
          </p>
          <p className="text-danger fw-semibold" style={{ fontSize: "0.9rem" }}>
            <i>Only authorized admins can log in to manage employee records.</i>
          </p>
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            Login to add, update, delete, or view employee details.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
