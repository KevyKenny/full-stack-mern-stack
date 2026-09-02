import User from '../models/User.js'
import { ROLES } from '../config/roles.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { sendTokenResponse } from '../utils/generateToken.js'

const buildRegisterPayload = (body) => {
  const {
    firstName,
    lastName,
    email,
    password,
    department,
    jobTitle,
    phone,
  } = body

  return {
    firstName,
    lastName,
    email,
    password,
    department,
    jobTitle,
    phone,
    role: ROLES.EMPLOYEE,
  }
}

export const register = asyncHandler(async (req, res) => {
  const { email } = req.body

  const existingUser = await User.findOne({ email: email?.toLowerCase() })
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'An account with this email already exists.',
    })
  }

  const user = await User.create(buildRegisterPayload(req.body))
  sendTokenResponse(user, 201, res, 'Registration successful')
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.',
    })
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password')

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.',
    })
  }

  if (!user.isActive) {
    return res.status(403).json({
      success: false,
      message: 'Your account has been deactivated. Contact an admin.',
    })
  }

  user.lastLoginAt = new Date()
  await user.save({ validateBeforeSave: false })

  sendTokenResponse(user, 200, res, 'Login successful')
})

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user.toSafeObject(),
    permissions: req.permissions,
  })
})

export const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Current password and new password are required.',
    })
  }

  const user = await User.findById(req.user._id).select('+password')

  if (!(await user.matchPassword(currentPassword))) {
    return res.status(401).json({
      success: false,
      message: 'Current password is incorrect.',
    })
  }

  user.password = newPassword
  await user.save()

  sendTokenResponse(user, 200, res, 'Password updated successfully')
})

export const updateMyProfile = asyncHandler(async (req, res) => {
  const allowedFields = ['firstName', 'lastName', 'department', 'jobTitle', 'phone', 'avatar']
  const updates = {}

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field]
    }
  })

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    user: user.toSafeObject(),
  })
})
