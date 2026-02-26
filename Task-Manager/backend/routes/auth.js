// backend/routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

// In-memory user store (Use a DB in production)
const users = [];

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  users.push({ id: Date.now(), name, email, password });
  res.status(201).json({ message: "User created" });
});

router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET);
  res.json({ token, name: user.name });
});

export default router;