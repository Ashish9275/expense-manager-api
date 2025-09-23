import React, { useState, useEffect } from "react";
import API from "../api";

function History({ token }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const res = await API.get("/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(res.data);
        setError("");
      } catch (err) {
        console.error("Error fetching expenses:", err);
        setError("Failed to fetch history.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchExpenses();
  }, [token]);

  return (
    <div className="container mt-4" style={{ maxWidth: 800 }}>
      <h2 className="mb-3">Expense History</h2>

      {loading && <p>Loading history...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Amount (₹)</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((exp) => (
                <tr key={exp._id}>
                  <td>{exp.title}</td>
                  <td>{exp.amount}</td>
                  <td>{exp.category}</td>
                  <td>{new Date(exp.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No expenses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;
