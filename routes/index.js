const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const { body, validationResult } = require('express-validator');

// Get all todo list
router.get('/', async (req, res) => {
    try {
        const todolist = await Todo.find();
        res.render('index', { todolist });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Add a new todo
router.post('/add', [
    body('task').notEmpty().withMessage('Task is required'),
    body('priority').isIn(['Low', 'Medium', 'High']).withMessage('Priority must be Low, Medium, or High'),
    body('dueDate').isISO8601().withMessage('Due date must be a valid date')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newTodo = new Todo({
            task: req.body.task,
            priority: req.body.priority,
            dueDate: req.body.dueDate
        });
        await newTodo.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete a todo
router.post('/delete/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Mark a todo as completed
router.post('/complete/:id', async (req, res) => {
    try {
        await Todo.findByIdAndUpdate(req.params.id, { completed: true });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Render the login page
router.get('/login', (req, res) => {
    res.render('login'); // Ensure there's a login.ejs file in the views directory
});

// About page
router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;
