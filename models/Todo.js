const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,  // Ensure that 'task' is always provided
    },
    completed: {
        type: Boolean,
        default: false,  // Defaults to false, meaning the task is not completed by default
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],  // Valid values for priority
        default: 'Medium',  // Default value if none is provided
    },
    dueDate: {
        type: Date,  // Date field for task due date
    }
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);
