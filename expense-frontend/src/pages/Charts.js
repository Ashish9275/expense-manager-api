import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import API from "../api";

// ✅ Register ChartJS modules
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function Charts({ token }) {
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
        setError("Failed to fetch chart data.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchExpenses();
  }, [token]);

  // ✅ Group expenses by category
  const categories = [...new Set(expenses.map((exp) => exp.category))];
  const categoryTotals = categories.map((cat) =>
    expenses
      .filter((exp) => exp.category === cat)
      .reduce((sum, exp) => sum + Number(exp.amount), 0)
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: categoryTotals,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 800 }}>
      <h2 className="mb-3">Expense Charts</h2>
      {loading && <p>Loading chart...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && expenses.length > 0 ? (
        <Bar data={data} />
      ) : (
        !loading && !error && <p>No expenses available for chart</p>
      )}
    </div>
  );
}

export default Charts;
