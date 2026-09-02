import { Router } from 'express'
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserRole,
  updateUserStatus,
  deleteUser,
} from '../controllers/userController.js'
import {
  protect,
  authorizeRoles,
  authorizePermission,
} from '../middleware/authMiddleware.js'
import { ROLES, PERMISSIONS } from '../config/roles.js'

const router = Router()

router.use(protect)

router
  .route('/')
  .get(authorizePermission(PERMISSIONS.VIEW_USERS), getUsers)
  .post(authorizePermission(PERMISSIONS.MANAGE_USERS), createUser)

router
  .route('/:id')
  .get(authorizePermission(PERMISSIONS.VIEW_USERS), getUserById)
  .put(authorizePermission(PERMISSIONS.MANAGE_USERS), updateUser)
  .delete(authorizePermission(PERMISSIONS.MANAGE_USERS), deleteUser)

router.patch(
  '/:id/role',
  authorizeRoles(ROLES.ADMIN),
  authorizePermission(PERMISSIONS.UPDATE_USER_ROLE),
  updateUserRole
)

router.patch(
  '/:id/status',
  authorizeRoles(ROLES.ADMIN),
  authorizePermission(PERMISSIONS.DEACTIVATE_USER),
  updateUserStatus
)

export default router
