import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import products from './data/products.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
  res.status(200).send('API is running...')
})

app.get('/api/products', (req, res) => {
  res.status(200).json(products)
})

app.get('/api/products/:id', (req, res) => {
  res.status(200).json(products.find((p) => p._id === req.params.id))
})

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
)
