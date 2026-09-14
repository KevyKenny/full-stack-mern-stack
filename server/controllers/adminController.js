const Task = require('../models/task.js') // your mongoose model

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}) // admin gets ALL tasks
    res.json({ tasks })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.json({ message: 'Task deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getAllTasks, deleteTask }
