const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

// Load environment variables
dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/venues", require("./routes/venues"))
app.use("/api/bookings", require("./routes/bookings"))
app.use("/api/users", require("./routes/users"))
app.use("/api/admin", require("./routes/admin"))

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Venue Booking API is running!" })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!" })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" })
})

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/venuebooking")
  .then(() => {
    console.log("Connected to MongoDB")

    // Start server
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
      console.log(`🚀 Backend server running on port ${PORT}`)
      console.log(`📍 API URL: http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  })
