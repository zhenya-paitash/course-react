// EXPORT
const path = require('path')
const express = require('express')
const { errHandler } = require('./middleware/errorMiddleware')
const { config } = require('dotenv')
const connectDB = require('./config/db')
require('colors')

// CONFIG
config({ path: path.join(__dirname, '../.env.production') })
connectDB()
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROUTES
app.use('/api/goal', require('./routes/goalRoutes'))
app.use('/api/user', require('./routes/userRoutes'))

// Server FRONTEND
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to Production'))
}

// ERROR
app.use(errHandler)

// SERVER
app.listen(port, () => console.log(`Server started on port ${port}`))
