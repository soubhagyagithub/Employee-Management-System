import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetch } from "../api/employeeApi"; // or your fetch wrapper

function EmployeeView() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/employees/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch employee");
        return res.json();
      })
      .then((data) => setEmployee(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!employee) return <div>Loading...</div>;

  return (
    <div>
      <h2>Employee Details</h2>
      <p>
        <b>Name:</b> {employee.name}
      </p>
      <p>
        <b>Email:</b> {employee.email}
      </p>
      <p>
        <b>Position:</b> {employee.position}
      </p>
      <p>
        <b>Department:</b> {employee.department}
      </p>
      {/* Add all other fields */}
    </div>
  );
}

export default EmployeeView;
