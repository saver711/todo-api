import dotenv from "dotenv"
import express from "express"
import { connectDB } from "./config/db"
import authRoutes from "./routes/auth.routes"
import todoRoutes from "./routes/todo.routes"
import { swaggerSpec } from "./swagger/swagger"

import bcrypt from "bcrypt"
import swaggerUi from "swagger-ui-express"
import { User } from "./models/user.model"
import cors from "cors"
dotenv.config()

const app = express()
app.use(cors())
// Middleware
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/todos", todoRoutes)

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Start the server
const PORT = process.env.PORT || 5000
connectDB()
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const seedSuperAdmin = async () => {
  const superAdmin = await User.findOne({ email: "super@bright.com" })
  if (!superAdmin) {
    const hashedPassword = await bcrypt.hash("123456", 10)
    await User.create({
      email: "super@bright.com",
      password: hashedPassword,
      role: "SUPER_ADMIN"
    })
    console.log("SUPER_ADMIN user created.")
  }
}

seedSuperAdmin()
