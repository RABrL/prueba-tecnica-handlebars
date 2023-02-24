import createError from 'http-errors'

export const Response = {
  success: (res, status = 200, message = 'OK', body = {}) => {
    res.status(status).json({ message, body })
  },
  error: (res, error = null) => {
    const { statusCode, message } = error || createError.InternalServerError()
    res.status(statusCode).json(message)
  }
}
