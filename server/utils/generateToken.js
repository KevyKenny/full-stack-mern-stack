import jwt from 'jsonwebtoken'

export function generateAccessToken(userId) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables')
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

export function sendTokenResponse(user, statusCode, res, message) {
  const token = generateAccessToken(user._id)

  const safeUser = user.toSafeObject ? user.toSafeObject() : user

  res.status(statusCode).json({
    success: true,
    message,
    token,
    user: safeUser,
  })
}
