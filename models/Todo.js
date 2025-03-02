const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    task: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    dueDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > new Date();
            },
            message: 'Due date must be in the future.'
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);
