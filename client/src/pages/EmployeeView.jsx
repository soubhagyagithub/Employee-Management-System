import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEmployeeById } from "../api/employeeApi";
import { Container, Card, Row, Col, Spinner } from "react-bootstrap";

export default function EmployeeView() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEmployee() {
      try {
        const data = await fetchEmployeeById(id);
        setEmployee(data.employee);
      } catch (err) {
        alert("Failed to load employee details");
      } finally {
        setLoading(false);
      }
    }
    loadEmployee();
  }, [id]);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!employee) {
    return (
      <Container className="text-center mt-5">
        <h5>No employee data found.</h5>
      </Container>
    );
  }

  const dob = new Date(employee.dob);
  const formattedDOB = `${dob.getDate().toString().padStart(2, "0")}-${(
    dob.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${dob.getFullYear()}`;

  return (
    <Container className="my-4">
      <Card className="shadow-lg rounded-4 p-4">
        <Card.Title className="mb-4 text-center fs-3 fw-bold text-primary">
          Employee Details
        </Card.Title>
        <Row>
          <Col md={6}>
            <p>
              <strong>First Name:</strong> {employee.firstName}
            </p>
            <p>
              <strong>Middle Name:</strong> {employee.middleName || "-"}
            </p>
            <p>
              <strong>Last Name:</strong> {employee.lastName}
            </p>
            <p>
              <strong>Date of Birth:</strong> {formattedDOB}
            </p>
          </Col>
          <Col md={6}>
            <p>
              <strong>Department:</strong> {employee.department}
            </p>
            <p>
              <strong>Salary:</strong> ₹{employee.salary}
            </p>
            <p>
              <strong>Permanent Address:</strong> {employee.permanentAddress}
            </p>
            <p>
              <strong>Current Address:</strong> {employee.currentAddress}
            </p>
          </Col>
        </Row>
        <p className="mt-3">
          <strong>ID Proof (PDF):</strong>{" "}
          {employee.idProof ? (
            <a
              href={employee.idProof}
              target="_blank"
              rel="noopener noreferrer"
            >
              View/Download PDF
            </a>
          ) : (
            "No file uploaded"
          )}
        </p>
      </Card>
    </Container>
  );
}
