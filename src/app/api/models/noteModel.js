const mongoose = require('mongoose');

import { Schema, model, models } from "mongoose";

const todoSchema = new Schema({
    todoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'todo',

    },

    description: {
        type: String,
        required: true,
    },


}
    ,
    { timestamps: true }
);

const Note = models.Note || model('Note', todoSchema);
export default Note;