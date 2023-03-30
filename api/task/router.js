// build your `/api/tasks` router here
const express = require('express');
const { getTaskById, removeTask, updateTask, addTask, getTasks } = require('./model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (err) {
    next({ status: 500, message: 'Could not retrieve tasks.' });
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await getTaskById(id);
    if (task) {
      res.json(task);
    } else {
      next({ status: 404, message: `Task with ID ${id} not found.` });
    }
  } catch (err) {
    next({ status: 500, message: `Could not retrieve task with ID ${id}.` });
  }
});

router.post('/', async (req, res, next) => {
  const taskData = req.body;
  if (!taskData.description) {
    next({ status: 400, message: 'Task description is required.' });
  } else {
    try {
      const newTask = await addTask(taskData);
      res.status(201).json(newTask);
    } catch (err) {
      next({ status: 500, message: 'Could not add task.' });
    }
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const task = await getTaskById(id);
    if (task) {
      if (!changes.description) {
        next({ status: 400, message: 'Task description is required.' });
      } else {
        const updatedTask = await updateTask(id, changes);
        res.json(updatedTask);
      }
    } else {
      next({ status: 404, message: `Task with ID ${id} not found.` });
    }
  } catch (err) {
    next({ status: 500, message: `Could not update task with ID ${id}.` });
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await getTaskById(id);
    if (task) {
      await removeTask(id);
      res.json(task);
    } else {
      next({ status: 404, message: `Task with ID ${id} not found.` });
    }
  } catch (err) {
    next({ status: 500, message: `Could not delete task with ID ${id}.` });
  }
});

module.exports = router;
