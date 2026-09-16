const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    priority: {
        type: string
    },

     iscompleted: {
    type: Boolean,
    default: false
},

completionDate: {
    type: Date,
    default: null
},

dueDate: {
    type: Date,
    default: null
}
},
{
    timestamps: true
}
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;