import React, { useState, useEffect, useCallback } from "react";
import API from "../api";

function Dashboard({ token, onLogout }) {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch expenses wrapped in useCallback
  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setError("Failed to fetch expenses.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  // ✅ Run when token changes
  useEffect(() => {
    if (token) fetchExpenses();
  }, [token, fetchExpenses]);

  // ✅ Add new expense
  const addExpense = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        "/expenses",
        { title, amount, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setAmount("");
      setCategory("");
      fetchExpenses();
    } catch (err) {
      console.error("Error adding expense:", err);
      setError("Failed to add expense.");
    }
  };

  // ✅ Delete expense
  const deleteExpense = async (id) => {
    try {
      await API.delete(`/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpenses();
    } catch (err) {
      console.error("Error deleting expense:", err);
      setError("Failed to delete expense.");
    }
  };

  // ✅ Calculate total expenses
  const totalAmount = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  return (
    <div className="container mt-5" style={{ maxWidth: 600 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Expense Manager</h2>
        <button className="btn btn-outline-danger" onClick={onLogout}>
          Logout
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <p>Loading expenses...</p>}

      <p className="fw-bold">
        You have {expenses.length} expenses totaling ₹{totalAmount}
      </p>

      <form onSubmit={addExpense} className="row g-2 mb-3">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-success w-100">
            Add
          </button>
        </div>
      </form>

      <ul className="list-group">
        {expenses.map((exp) => (
          <li
            key={exp._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {exp.title} - ₹{exp.amount} ({exp.category})
            </span>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteExpense(exp._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
