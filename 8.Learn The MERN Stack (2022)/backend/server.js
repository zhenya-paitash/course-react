// EXPORT
const express = require('express')
const colors = require('colors')
const { errHandler } = require('./middleware/errorMiddleware')
const { config } = require('dotenv')
const connectDB = require('./config/db')

// CONFIG
config({ path: './.env' })
connectDB()
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROUTES
app.use('/api/goals', require('./routes/goalRoutes'))

// ERROR
app.use(errHandler)

// SERVER
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
