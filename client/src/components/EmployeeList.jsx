import React, { useEffect, useState } from "react";
import {
  fetchEmployees,
  updateEmployee,
  addEmployee,
  deleteEmployee,
  fetchEmployeeById,
  fetchEmployeeHistory,
} from "../api/employeeApi";
import EmployeeForm from "./EmployeeForm";
import { Dropdown, Button, Table, Form, Spinner } from "react-bootstrap";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [editingData, setEditingData] = useState(null);
  const limit = 10;

  useEffect(() => {
    loadEmployees();
  }, [search, page]);

  async function loadEmployees() {
    try {
      const data = await fetchEmployees({ search, page, limit });
      setEmployees(data.employees);
      setTotal(data.total);
    } catch (error) {
      alert("Failed to load employees");
    }
  }

  const totalPages = Math.ceil(total / limit);

  async function handleAction(action, employee) {
    switch (action) {
      case "edit":
        setEditingData(employee);
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "delete":
        if (window.confirm(`Are you sure to delete ${employee.firstName}?`)) {
          try {
            await deleteEmployee(employee._id);
            alert("Employee deleted successfully");
            loadEmployees();
          } catch (error) {
            alert("Failed to delete employee: " + (error.message || ""));
          }
        }
        break;
      case "view":
        window.open(`/employee/${employee._id}/view`, "_blank");
        break;
      case "history":
        window.open(`/employee/${employee._id}/history`, "_blank");
        break;
      default:
        break;
    }
  }

  async function handleFormSubmit(formData) {
    try {
      if (editingData) {
        await updateEmployee(editingData._id, formData);
        alert("Employee updated");
      } else {
        await addEmployee(formData);
        alert("Employee added");
      }
      setEditingData(null);
      loadEmployees();
    } catch (error) {
      alert(error.message || "Operation failed");
    }
  }

  return (
    <div className="container my-4">
      <EmployeeForm
        onSubmit={handleFormSubmit}
        editingData={editingData}
        onCancel={() => setEditingData(null)}
      />

      <div className="d-flex justify-content-between align-items-center my-4">
        <h2 className="mb-0">Employees List:</h2>
        <Form.Control
          type="text"
          placeholder="Search by ID, name, loginId..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-50"
        />
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Employee ID</th>
            <th>Login ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No employees found
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.employeeId}</td>
                <td>{emp.loginId}</td>
                <td>{`${emp.firstName} ${emp.middleName || ""} ${
                  emp.lastName
                }`}</td>
                <td>{new Date(emp.dob).toLocaleDateString()}</td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" size="sm">
                      Actions
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleAction("view", emp)}>
                        View
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleAction("edit", emp)}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleAction("delete", emp)}
                      >
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleAction("history", emp)}
                      >
                        History
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
        <Button
          variant="outline-primary"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </Button>
        <span>
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>
        <Button
          variant="outline-primary"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
