export const badRequestHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 400) {
    res.status(400).send(err.message)
  }
  next(err)
} // 400

export const notFoundHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 404) {
    res.status(404).send(err.message || "Resource not found!")
  }
  next(err)
} 

export const genericErrorHandler = (err, req, res, next) => {
  if (!res.headersSent) {
    // checks if another error middleware already sent a response
    res.status(err.httpStatusCode || 500).send(err.message)
  }
}