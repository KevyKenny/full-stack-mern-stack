import User from '../models/User.js'
import { ROLES } from '../config/roles.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const sanitizeUserInput = (body, isAdminCreate = false) => {
  const allowed = ['firstName', 'lastName', 'email', 'password', 'department', 'jobTitle', 'phone', 'avatar']

  if (isAdminCreate) {
    allowed.push('role', 'isActive', 'isEmailVerified')
  }

  const payload = {}
  allowed.forEach((field) => {
    if (body[field] !== undefined) {
      payload[field] = body[field]
    }
  })

  return payload
}

export const getUsers = asyncHandler(async (req, res) => {
  const { role, isActive, search } = req.query
  const filter = {}

  if (role) filter.role = role
  if (isActive !== undefined) filter.isActive = isActive === 'true'

  if (search) {
    filter.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ]
  }

  const users = await User.find(filter).sort({ createdAt: -1 })

  res.status(200).json({
    success: true,
    count: users.length,
    users: users.map((user) => user.toSafeObject()),
  })
})

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found.',
    })
  }

  res.status(200).json({
    success: true,
    user: user.toSafeObject(),
  })
})

export const createUser = asyncHandler(async (req, res) => {
  const payload = sanitizeUserInput(req.body, true)

  if (!payload.role) {
    payload.role = ROLES.EMPLOYEE
  }

  if (!Object.values(ROLES).includes(payload.role)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid role. Use admin or employee.',
    })
  }

  payload.createdBy = req.user._id

  const user = await User.create(payload)

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    user: user.toSafeObject(),
  })
})

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found.',
    })
  }

  const updates = sanitizeUserInput(req.body, true)

  if (updates.role && !Object.values(ROLES).includes(updates.role)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid role. Use admin or employee.',
    })
  }

  Object.assign(user, updates)
  await user.save()

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    user: user.toSafeObject(),
  })
})

export const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body

  if (!role || !Object.values(ROLES).includes(role)) {
    return res.status(400).json({
      success: false,
      message: 'A valid role (admin or employee) is required.',
    })
  }

  if (req.params.id === req.user._id.toString()) {
    return res.status(400).json({
      success: false,
      message: 'You cannot change your own role.',
    })
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true, runValidators: true }
  )

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found.',
    })
  }

  res.status(200).json({
    success: true,
    message: `User role updated to ${role}`,
    user: user.toSafeObject(),
  })
})

export const updateUserStatus = asyncHandler(async (req, res) => {
  const { isActive } = req.body

  if (typeof isActive !== 'boolean') {
    return res.status(400).json({
      success: false,
      message: 'isActive must be true or false.',
    })
  }

  if (req.params.id === req.user._id.toString()) {
    return res.status(400).json({
      success: false,
      message: 'You cannot deactivate your own account.',
    })
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive },
    { new: true, runValidators: true }
  )

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found.',
    })
  }

  res.status(200).json({
    success: true,
    message: isActive ? 'User activated successfully' : 'User deactivated successfully',
    user: user.toSafeObject(),
  })
})

export const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user._id.toString()) {
    return res.status(400).json({
      success: false,
      message: 'You cannot delete your own account.',
    })
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  )

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found.',
    })
  }

  res.status(200).json({
    success: true,
    message: 'User deactivated successfully',
  })
})
