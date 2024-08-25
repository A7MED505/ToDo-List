const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todo list
router.get('/', async (req, res) => {
    const todolist = await Todo.find();
    res.render('index', { todolist });
});

// Add a new todo
router.post('/add', async (req, res) => {
    const newTodo = new Todo({
        task: req.body.task,
        priority: req.body.priority,
        dueDate: req.body.dueDate
    });
    await newTodo.save();
    res.redirect('/');
});

// Delete a todo
router.post('/delete/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

// Mark a todo as completed
router.post('/complete/:id', async (req, res) => {
    await Todo.findByIdAndUpdate(req.params.id, { completed: true });
    res.redirect('/');
});

module.exports = router;
