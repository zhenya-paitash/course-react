const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

async function userRouter(router, opts) {
  let { path } = opts

  // * ROUTES
  router.post(path, registerUser)
  router.post(`${path}/login`, loginUser)
  router.route({
    url: `${path}/me`,
    method: 'GET',
    preHandler: [protect],
    handler: getMe,
  })
}

module.exports = userRouter
