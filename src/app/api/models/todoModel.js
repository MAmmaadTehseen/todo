const mongoose = require('mongoose');

import { Schema, model, models } from "mongoose";

const todoSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'

    },
    title: {
        type: String,
    },
    description: {
        type: String,
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
    isDeleted: {
        type: Boolean,
        default: false,
    }
},
    { timestamps: true });

const Todo = models.Todo || model('Todo', todoSchema);

export default Todo;