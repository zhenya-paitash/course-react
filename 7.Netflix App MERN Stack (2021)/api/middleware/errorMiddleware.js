// const notFound = (req, res, next) => {
//   res.status(404)
//   next(new Error(`Page: ${req.originalUrl} Not Found! 🔴`))
// }

// const errorHandler = (err, req, res, next) => {
//   const status = res.statusCode === 200 ? 500 : res.statusCode
//   res.status(status).json({
//     message: err.message,
//     stack: process.env.NODE_ENV === "production" ? null : err.stack,
//   })
// }

// module.exports = { notFound, errorHandler }

module.exports = (req, res) =>
  res.status(404).json(`Page: ${req.originalUrl} not found! 🔴`)
