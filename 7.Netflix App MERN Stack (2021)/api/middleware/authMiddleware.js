import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"

const verify = asyncHandler((req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    res.status(401)
    throw new Error("You are not authenticated! 🤐")
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      res.status(403)
      throw new Error("Token is not valid! 🔴")
    }

    req.user = user
    next()
  })
})

const isAdmin = asyncHandler((req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(403)
    throw new Error("You are not allowed! 🛡️")
  }

  next()
})

export { verify, isAdmin }
