// backend/routes/tasks.js
import express from 'express';
const router = express.Router();

let tasks = []; // Mock DB

// Simple protection middleware
const verify = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  // Verify logic here...
  next();
};

router.get('/', verify, (req, res) => {
  res.json(tasks);
});

router.post('/', verify, (req, res) => {
  const newTask = { id: Date.now(), ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

export default router