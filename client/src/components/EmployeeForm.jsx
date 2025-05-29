import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Card, Container } from "react-bootstrap";

export default function EmployeeForm({ onSubmit, editingData, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    department: "",
    salary: "",
    permanentAddress: "",
    currentAddress: "",
    idProof: null,
  });

  useEffect(() => {
    if (editingData) {
      const {
        firstName,
        middleName,
        lastName,
        dob,
        department,
        salary,
        permanentAddress,
        currentAddress,
      } = editingData;
      setFormData({
        firstName,
        middleName,
        lastName,
        dob: dob?.substring(0, 10),
        department,
        salary,
        permanentAddress,
        currentAddress,
        idProof: null,
      });
    } else {
      resetForm();
    }
  }, [editingData]);

  function resetForm() {
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      department: "",
      salary: "",
      permanentAddress: "",
      currentAddress: "",
      idProof: null,
    });
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "idProof" ? files[0] : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
    if (!editingData) resetForm();
  }

  return (
    <Container className="my-4">
      <Card>
        <Card.Body>
          <Card.Title className="mb-4">
            {editingData ? "Edit Employee" : "Add Employee"}
          </Card.Title>

          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Enter first name"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="middleName">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder="Enter middle name"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Enter last name"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="dob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="department">
                  <Form.Label>Department</Form.Label>
                  <Form.Select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Support">Support</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="salary">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                    placeholder="Enter salary"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="permanentAddress">
                  <Form.Label>Permanent Address</Form.Label>
                  <Form.Control
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    required
                    placeholder="Enter permanent address"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="currentAddress">
                  <Form.Label>Current Address</Form.Label>
                  <Form.Control
                    name="currentAddress"
                    value={formData.currentAddress}
                    onChange={handleChange}
                    required
                    placeholder="Enter current address"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="idProof">
                  <Form.Label>ID Proof (PDF)</Form.Label>
                  <Form.Control
                    type="file"
                    name="idProof"
                    accept="application/pdf"
                    onChange={handleChange}
                    required={!editingData}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex gap-2 mt-4">
              <Button variant="primary" type="submit">
                {editingData ? "Update Employee" : "Add Employee"}
              </Button>
              {editingData && (
                <Button variant="secondary" type="button" onClick={onCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
