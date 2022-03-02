// EXPORTS
import express from "express"
import { config } from "dotenv"
import database from "./config/database.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import movieRoutes from "./routes/movieRoutes.js"
import listRoutes from "./routes/listRoutes.js"
import error404 from "./middleware/errorMiddleware.js"
const app = express()

// CONFIG && DATABASE
config()
database.connect()
app.use(express.json())

// ROUTES
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/movie", movieRoutes)
app.use("/api/list", listRoutes)
app.use(error404)

// SERVER
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("server  : ✔️"))
