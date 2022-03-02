// EXPORTS
const express = require("express")
const app = express()
const dotenv = require("dotenv")
const database = require("./config/database")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const movieRoutes = require("./routes/movieRoutes")
const listRoutes = require("./routes/listRoutes")
const error404 = require("./middleware/errorMiddleware")

// CONFIG && DATABASE
dotenv.config()
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
