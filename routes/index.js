const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




// Get all todo list
router.get('/', async (req, res) => {
    const todolist = await Todo.find();
    res.render('index', { todolist });
});

// Add a new todo
router.post('/add', async (req, res) => {
    const newTodo = new Todo({
        task: req.body.task
    });
    await newTodo.save();
    res.redirect('/');
});

// Delete a todo
router.post('/delete/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;
