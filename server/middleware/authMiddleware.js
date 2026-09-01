import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { getPermissionsForRole, roleHasPermission } from '../config/roles.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Please log in.',
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User belonging to this token no longer exists.',
      })
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Contact an admin.',
      })
    }

    if (user.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        success: false,
        message: 'Password was recently changed. Please log in again.',
      })
    }

    req.user = user
    req.permissions = getPermissionsForRole(user.role)
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.',
    })
  }
})

export const authorizeRoles = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized.',
      })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.role}' is not allowed to access this route.`,
      })
    }

    next()
  })

export const authorizePermission = (...permissions) =>
  asyncHandler(async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized.',
      })
    }

    const hasPermission = permissions.some((permission) =>
      roleHasPermission(req.user.role, permission)
    )

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action.',
      })
    }

    next()
  })

export const restrictToSelfOrAdmin = (paramName = 'id') =>
  asyncHandler(async (req, res, next) => {
    const targetUserId = req.params[paramName]

    if (
      req.user.role === 'admin' ||
      req.user._id.toString() === targetUserId
    ) {
      return next()
    }

    return res.status(403).json({
      success: false,
      message: 'You can only access your own profile.',
    })
  })
