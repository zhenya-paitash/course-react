const { getNotes, addNote } = require('../controllers/noteController')
const { protect } = require('../middleware/authMiddleware')

async function noteRouter(router, opts) {
  let { path } = opts

  // * ROUTES
  router.route({
    url: path,
    method: 'GET',
    preHandler: [protect],
    handler: getNotes,
  })
  router.route({
    url: path,
    method: 'POST',
    preHandler: [protect],
    handler: addNote,
  })
}

module.exports = noteRouter
