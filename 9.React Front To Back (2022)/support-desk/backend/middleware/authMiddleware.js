const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = async (req, res) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token
      token = req.headers.authorization.split` `[1]
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password')

      return
    } catch (e) {
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized')
  }
}

module.exports = {
  protect,
}
