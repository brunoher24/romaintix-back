import express from "express"
// import { fileURLToPath } from "url"
// import { dirname, join } from "path"
import apiRoutes from "./routes/api.js"
import { logger, requestTimer } from "./middleware/logger.js"

// Create Express app
const app = express()
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(logger)
app.use(requestTimer)

// Routes
app.use("/api", apiRoutes)

// app.get("/", (req, res) => {
//   res.sendFile(join(__dirname, "public", "index.html"))
// })

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!", error: err.message })
})

const port = process.env.PORT || 3000

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})


export default app

