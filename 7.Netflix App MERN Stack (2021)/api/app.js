// EXPORTS
import express from "express"
import { config } from "dotenv"
import database from "./config/database.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import movieRoutes from "./routes/movieRoutes.js"
import listRoutes from "./routes/listRoutes.js"
import { err404, errHandler } from "./middleware/errorMiddleware.js"
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
app.use(err404)
app.use(errHandler)

// SERVER
const { PORT } = process.env
app.listen(PORT || 5000, () => console.log("server  : ✔️"))
