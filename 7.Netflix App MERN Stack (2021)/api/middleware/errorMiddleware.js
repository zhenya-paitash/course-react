// export default (req, res) =>
// res.status(404).json(`Page: ${req.originalUrl} not found! 🔴`)

const err404 = (req, res, next) => {
  const error = new Error("Not Found: " + req.originalUrl)
  console.log("error 404")
  res.status(404)
  next(error)
}

const errHandler = (err, req, res, next) => {
  const code = res.statusCode === 200 ? 500 : res.statusCode
  res.status(code).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  })
}

export { err404, errHandler }
