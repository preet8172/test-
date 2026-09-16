const express = require('express');

const router = express.Router();

const{
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require('../controllers/task controllers');

const{
    validateTask
} = require('../middleware/task middleware');

router.post('/tasks', validateTask, createTask);

router.get('/tasks', getAllTasks);

router.patch('/:id', updateTask);

router.delete('/', deleteTask);

module.exports = router;