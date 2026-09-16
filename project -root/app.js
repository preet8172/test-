const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const taskRoutes = require("./routes/task.routes");

dotenv.config();

const app = express();


// Middleware
app.use(express.json());


// MongoDB connection
connectDB();


// Routes
app.use("/tasks", taskRoutes);


// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Advanced Task Management API is running"
  });
});


// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});