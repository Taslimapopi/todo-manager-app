import mongoose from "mongoose";
import { validation } from "../../../shared/constant";


const todoSchema = new mongoose.Schema({
    title :{
        type : String,
        required : [true, 'title is required'],
        minLength : [1, 'title cannot be empty'],
        maxLength : [validation.todo_title_length,  `title cannot be exceed ${validation.todo_title_length} charaters`]
    }
})