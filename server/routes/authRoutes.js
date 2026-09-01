import { Router } from 'express'
import {
  register,
  login,
  getMe,
  updatePassword,
  updateMyProfile,
} from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)

router.get('/me', protect, getMe)
router.put('/profile', protect, updateMyProfile)
router.put('/password', protect, updatePassword)

export default router
