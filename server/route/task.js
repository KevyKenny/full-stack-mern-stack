import {Router} from 'express';
import Task from '../models/task.js'; // import your model


const router = Router();

// @route   POST /api/tasks
// @desc    Create a new task
router.post('/', async (req, res) => {
  try {
    const { title } = req.body; // get title from request body

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newTask = new Task({
      title
      // done will default to false automatically
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/tasks
// @desc    Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task by ID
router.put('/:id', async (req, res) => {
    try {
        const { title, done } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, done },
            { new: true, runValidators: true } // new:true returns the updated doc
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

