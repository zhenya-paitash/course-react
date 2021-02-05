const express = require('express')
const products = require('./data/products')
const dotenv = require('dotenv')

dotenv.config()

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
