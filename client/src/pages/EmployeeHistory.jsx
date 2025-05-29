import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEmployeeHistory } from "../api/employeeApi";

export default function EmployeeHistory() {
  const { id } = useParams();
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchEmployeeHistory(id);
        setHistory(data.history);
      } catch {
        alert("Failed to load employee history");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!history || history.length === 0) return <div>No history available</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Employee History</h1>
      <ul>
        {history.map((record, index) => (
          <li key={index}>
            {/* customize this depending on your history data shape */}
            {JSON.stringify(record)}
          </li>
        ))}
      </ul>
    </div>
  );
}
