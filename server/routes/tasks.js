const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// Get all tasks for user
router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ userId: req.user });
  res.json(tasks);
});

// Add task
router.post("/", authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  const newTask = new Task({ userId: req.user, title, description });
  await newTask.save();
  res.json(newTask);
});

// Update task
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, description, completed } = req.body;
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user },
    { title, description, completed },
    { new: true }
  );
  res.json(updated);
});

// Delete task
router.delete("/:id", authMiddleware, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user });
  res.json({ msg: "Task deleted" });
});

module.exports = router;
