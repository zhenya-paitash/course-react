// EXPORTS
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")
const usersRoute = require("./routes/users")

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
app.use("/api/users", usersRoute)

// SERVER
app.listen(process.env.PORT || 5000, () =>
  console.log("Backend server is running!")
)
