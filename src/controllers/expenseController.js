import Expense from "../models/expenseModel.js";

export const addExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;
    const expense = await Expense.create({ userId: req.user.id, title, amount, category });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!expense) return res.status(404).json({ msg: "Expense not found" });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ msg: "Expense not found" });
    res.json({ msg: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
