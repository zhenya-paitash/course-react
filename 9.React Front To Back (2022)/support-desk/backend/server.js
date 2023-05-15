const Fastify = require('fastify')
const dotenv = require('dotenv')
const { connectDB } = require('./config/db')

// * PRE-CONFIG
dotenv.config()
connectDB()
require('colors')

// * VARS
const app = Fastify({ logger: false })
const PORT = process.env.PORT || 5000

// * CONFIG
app.register(require('@fastify/formbody'))
app.register(require('@fastify/cors'))

// * ROUTES
// @path  /api/users
app.register(require('./routes/userRouter'), { path: '/api/users' })
// @path  /api/tickets
app.register(require('./routes/ticketRouter'), { path: '/api/tickets' })
// @path  /api/tickets/:ticketId/notes
app.register(require('./routes/noteRouter'), {
  prefix: '/api/tickets/:ticketId',
  path: '/notes',
})

// * SERVER FRONTEND
if (process.env.NODE_ENV === 'production') {
  const path = require('path')
  app.register(require('@fastify/static'), {
    root: path.join(__dirname, '../frontend/build'),
    // prefix: '../frontend/build'
  })

  app.get('*', (req, res) => {
    res
      .status(200)
      .sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  })
} else {
  app.get('/', (req, res) => {
    res.status(200).send({ message: 'Welcome to the Support Desk API' })
  })
}

// * SERVER LISTEN
app.listen({ port: PORT }, err => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
