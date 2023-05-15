const {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketController')
const { protect } = require('../middleware/authMiddleware')

async function ticketRouter(router, opts) {
  let { path } = opts

  // * ROUTES
  router.route({
    url: path,
    method: 'GET',
    preHandler: [protect],
    handler: getTickets,
  })
  router.route({
    url: path,
    method: 'POST',
    preHandler: [protect],
    handler: createTicket,
  })
  router.route({
    url: path + '/:id',
    method: 'GET',
    preHandler: [protect],
    handler: getTicket,
  })
  router.route({
    url: path + '/:id',
    method: 'DELETE',
    preHandler: [protect],
    handler: deleteTicket,
  })
  router.route({
    url: path + '/:id',
    method: 'PUT',
    preHandler: [protect],
    handler: updateTicket,
  })
}

module.exports = ticketRouter
