import { Router } from 'express'
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js'
import { protect, authorizePermission } from '../middleware/authMiddleware.js'
import { PERMISSIONS } from '../config/roles.js'

const router = Router()

router.use(protect)

router
  .route('/')
  .get(authorizePermission(PERMISSIONS.VIEW_OWN_TASKS, PERMISSIONS.VIEW_ALL_TASKS), getTasks)
  .post(authorizePermission(PERMISSIONS.CREATE_TASK), createTask)

router
  .route('/:id')
  .get(authorizePermission(PERMISSIONS.VIEW_OWN_TASKS, PERMISSIONS.VIEW_ALL_TASKS), getTaskById)
  .put(
    authorizePermission(
      PERMISSIONS.UPDATE_OWN_TASK,
      PERMISSIONS.UPDATE_ANY_TASK
    ),
    updateTask
  )
  .delete(
    authorizePermission(
      PERMISSIONS.DELETE_OWN_TASK,
      PERMISSIONS.DELETE_ANY_TASK
    ),
    deleteTask
  )

export default router
