import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddEmployee() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    dob: null,
    department: "",
    salary: "",
    permanentAddress: "",
    currentAddress: "",
    idProof: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    if (!date) return setFormData((prev) => ({ ...prev, dob: null }));
    const now = new Date();
    const age = now.getFullYear() - date.getFullYear();
    if (
      age < 18 ||
      (age === 18 &&
        now <
          new Date(date.getFullYear() + 18, date.getMonth(), date.getDate()))
    ) {
      alert("Employee must be at least 18 years old.");
      return;
    }
    setFormData((prev) => ({ ...prev, dob: date }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type !== "application/pdf" ||
        file.size < 10000 ||
        file.size > 1000000)
    ) {
      alert("Only PDF files between 10KB to 1MB are allowed.");
      return;
    }
    setFormData((prev) => ({ ...prev, idProof: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val) data.append(key, val);
    });

    try {
      await axios.post("/api/employees", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Employee added successfully!");
    } catch (err) {
      alert("Error adding employee");
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4 p-5">
        <h2 className="text-center mb-4 text-dark fw-bold">Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                className="form-control form-control-lg"
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                name="middleName"
                placeholder="Middle Name"
                onChange={handleChange}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                className="form-control form-control-lg"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <DatePicker
              selected={formData.dob}
              onChange={handleDateChange}
              placeholderText="Date of Birth"
              dateFormat="dd-MMM-yyyy"
              showYearDropdown
              className="form-control form-control-lg"
              required
            />
          </div>

          <div className="mb-3">
            <select
              name="department"
              onChange={handleChange}
              className="form-select form-select-lg"
              required
              value={formData.department}
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Support">Support</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="salary"
              placeholder="Salary"
              onChange={handleChange}
              className="form-control form-control-lg"
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              name="permanentAddress"
              placeholder="Permanent Address"
              onChange={handleChange}
              className="form-control form-control-lg"
              rows="2"
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              name="currentAddress"
              placeholder="Current Address"
              onChange={handleChange}
              className="form-control form-control-lg"
              rows="2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              ID Proof (PDF only, 10KB-1MB)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
