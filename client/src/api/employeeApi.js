// src/api/employeeApi.js
const BASE_URL = "http://localhost:5000/api"; // change port if needed

export async function loginUser(credentials) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error("Login failed");
  return response.json(); // { token }
}

export async function fetchEmployees(params = {}) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${BASE_URL}/employees?${query}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  if (!response.ok) throw new Error("Failed to fetch employees");
  return response.json(); // { total, employees }
}

export async function addEmployee(employeeData) {
  const formData = new FormData();
  for (const key in employeeData) {
    formData.append(key, employeeData[key]);
  }
  const response = await fetch(`${BASE_URL}/employees`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to add employee");
  return response.json(); // { message, employee }
}

export async function updateEmployee(id, employeeData) {
  const formData = new FormData();
  for (const key in employeeData) {
    formData.append(key, employeeData[key]);
  }

  const response = await fetch(`${BASE_URL}/employees/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to update employee");
  return await response.json(); // { message, employee }
}

export async function deleteEmployee(id) {
  const response = await fetch(`${BASE_URL}/employees/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) throw new Error("Delete failed");
  return await response.json();
}
export async function fetchEmployeeById(id) {
  const response = await fetch(`${BASE_URL}/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch employee details");
  return response.json(); // { employee }
}

export async function fetchEmployeeHistory(id) {
  const response = await fetch(`${BASE_URL}/employees/${id}/history`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch employee history");
  return response.json(); // { history: [] }
}
