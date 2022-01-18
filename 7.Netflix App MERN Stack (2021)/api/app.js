const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Sucessfull!"))
  .catch(err => console.error(err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log("Backend server is running!")
})
