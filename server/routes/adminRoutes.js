const express = require('express')
const router = express.Router()
const { protect, admin } = require('../middleware/authMiddleware') // your auth middleware
const { getAllTasks, deleteTask } = require('../controllers/adminController')

router.get('/tasks', protect, admin, getAllTasks)          // GET /api/admin/tasks
router.delete('/tasks/:id', protect, admin, deleteTask)    // DELETE /api/admin/tasks/:id

module.exports = router

