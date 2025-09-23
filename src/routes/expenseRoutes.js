import express from "express";
import {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense
} from "../controllers/expenseController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add expense
router.post("/", auth, addExpense);

// Get all expenses of logged-in user
router.get("/", auth, getExpenses);

// Update expense
router.put("/:id", auth, updateExpense);

// Delete expense
router.delete("/:id", auth, deleteExpense);

export default router;   // ✅ don’t forget this
