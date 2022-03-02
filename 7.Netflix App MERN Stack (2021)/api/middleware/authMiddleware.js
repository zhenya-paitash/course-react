import jwt from "jsonwebtoken"

function verify(req, res, next) {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split` `[1]

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json("Token is not valid! 🔴")
      req.user = user
      next()
    })
  } else {
    return res.status(401).json("You are not authenticated! 🤐")
  }
}

function isAdmin(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).json("You are not allowed! 🛡️")
  next()
}

export { verify, isAdmin }
