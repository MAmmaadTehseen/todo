const mongoose = require('mongoose');

import { Schema, model, models } from "mongoose";

const todoSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    title: {
        type: String,
        required: true,
        unique: true,

    },
    description: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        default: "Active",
    },
    priority: {
        type: String,
        default: "Medium",
    },
    expiry: {
        type: Number,
        default: 5,
    },
});

const Todo = models.Todo || model('Todo', todoSchema);
export default Todo;