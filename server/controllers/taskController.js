import Task from '../models/task.js'
import { ROLES } from '../config/roles.js'
import { PERMISSIONS } from '../config/roles.js'
import { roleHasPermission } from '../config/roles.js'
import { asyncHandler } from '../utils/asyncHandler.js'

function canManageAnyTask(user) {
  return roleHasPermission(user.role, PERMISSIONS.VIEW_ALL_TASKS)
}

function buildTaskFilter(user) {
  if (canManageAnyTask(user)) {
    return {}
  }

  return {
    $or: [{ createdBy: user._id }, { assignedTo: user._id }],
  }
}

function userOwnsTask(user, task) {
  return (
    task.createdBy.toString() === user._id.toString() ||
    (task.assignedTo && task.assignedTo.toString() === user._id.toString())
  )
}

export const createTask = asyncHandler(async (req, res) => {
  const { title, assignedTo } = req.body

  if (!title?.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Title is required.',
    })
  }

  const taskPayload = {
    title: title.trim(),
    createdBy: req.user._id,
    assignedTo: assignedTo || req.user._id,
  }

  if (
    assignedTo &&
    assignedTo !== req.user._id.toString() &&
    req.user.role !== ROLES.ADMIN
  ) {
    return res.status(403).json({
      success: false,
      message: 'Only admins can assign tasks to other users.',
    })
  }

  const task = await Task.create(taskPayload)
  await task.populate('createdBy assignedTo', 'firstName lastName email role')

  res.status(201).json({
    success: true,
    task,
  })
})

export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find(buildTaskFilter(req.user))
    .sort({ createdAt: -1 })
    .populate('createdBy assignedTo', 'firstName lastName email role')

  res.status(200).json({
    success: true,
    count: tasks.length,
    tasks,
  })
})

export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id).populate(
    'createdBy assignedTo',
    'firstName lastName email role'
  )

  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found.',
    })
  }

  if (!canManageAnyTask(req.user) && !userOwnsTask(req.user, task)) {
    return res.status(403).json({
      success: false,
      message: 'You do not have permission to view this task.',
    })
  }

  res.status(200).json({
    success: true,
    task,
  })
})

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found.',
    })
  }

  const isAdmin = canManageAnyTask(req.user)
  const isOwner = userOwnsTask(req.user, task)

  if (!isAdmin && !isOwner) {
    return res.status(403).json({
      success: false,
      message: 'You do not have permission to update this task.',
    })
  }

  const { title, done, assignedTo } = req.body

  if (title !== undefined) task.title = title
  if (done !== undefined) task.done = done

  if (assignedTo !== undefined) {
    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Only admins can reassign tasks.',
      })
    }
    task.assignedTo = assignedTo
  }

  await task.save()
  await task.populate('createdBy assignedTo', 'firstName lastName email role')

  res.status(200).json({
    success: true,
    task,
  })
})

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found.',
    })
  }

  const isAdmin = roleHasPermission(req.user.role, PERMISSIONS.DELETE_ANY_TASK)
  const isOwner = task.createdBy.toString() === req.user._id.toString()

  if (!isAdmin && !isOwner) {
    return res.status(403).json({
      success: false,
      message: 'You do not have permission to delete this task.',
    })
  }

  await task.deleteOne()

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
  })
})
