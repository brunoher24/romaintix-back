import express from "express"

const router = express.Router()

// Sample data - in a real app, this would come from a database
let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
]

// Get all users
router.get("/users", (req, res) => {
  res.json(users)
})

// Get user by ID
router.get("/users/:id", (req, res) => {
  const id = Number.parseInt(req.params.id)
  const user = users.find((user) => user.id === id)

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  res.json(user)
})

// Create a new user
router.post("/users", (req, res) => {
  const { name, email } = req.body

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" })
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  }

  users.push(newUser)
  res.status(201).json(newUser)
})

// Update a user
router.put("/users/:id", (req, res) => {
  const id = Number.parseInt(req.params.id)
  const { name, email } = req.body

  const userIndex = users.findIndex((user) => user.id === id)

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" })
  }

  users[userIndex] = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email,
  }

  res.json(users[userIndex])
})

// Delete a user
router.delete("/users/:id", (req, res) => {
  const id = Number.parseInt(req.params.id)
  const userIndex = users.findIndex((user) => user.id === id)

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" })
  }

  const deletedUser = users[userIndex]
  users = users.filter((user) => user.id !== id)

  res.json({ message: "User deleted", user: deletedUser })
})

export default router

