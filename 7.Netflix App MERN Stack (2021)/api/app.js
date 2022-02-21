// EXPORTS
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const movieRoute = require("./routes/movies")

// CONFIG
dotenv.config()

// DATABASE
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("DB Connection Sucessfull!"))
  .catch(err => console.error(err))

app.use(express.json())

// ROUTES
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/movies", movieRoute)
app.use((req, res) => res.status(200).json("Server is running! 🟢"))

// SERVER
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Backend server is running on port ${PORT}`))
