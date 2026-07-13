import mongoose from "mongoose";
import { validation } from "../../../shared/constant.js";
import {
  priority_status,
  todo_status,
  valid_priority_status,
  valid_todo_status,
} from "../../../shared/enums.js";

const todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "title is required"],
      minLength: [1, "title cannot be empty"],
      unique: true,
      maxLength: [
        validation.todo_title_length,
        `title cannot exceed ${validation.todo_title_length} characters`,
      ],
      validate: {
        validator: (v) => v != null && v.trim().length > 0,
        message: "title cannot be empty",
      },
    },
    description: {
      type: String,
      trim: true,
      maxLength: [
        validation.todo_description_maxLength,
        `description cannot exceed ${validation.todo_description_maxLength} characters`,
      ],
    },
    status: {
      type: String,
      enum: {
        values: valid_todo_status,
        message: `status must be one of ${valid_todo_status.join(", ")}`,
      },
      default: todo_status.active,
    },
    priority: {
      type: String,
      enum: {
        value: valid_priority_status,
        message: `${priority_status.join(", ")} is not a valid`,
      },
      default: priority_status.low,
      index: true,
    },
    dueDate : {
      type : Date,
      default : null,
    },
  },

  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
  },
);

export const title_collation = { locale: "en", strength: 2 };


todoSchema.index({user:1, priority:1})
todoSchema.index({user:1, dueDate:1})

todoSchema.index(
  { user: 1, title: 1 },
  { unique: true, collation: title_collation },
);
todoSchema.index({ user: 1, status: 1, createdAt: -1 });
todoSchema.index({ user: 1, title: "text", description: "text" });

export const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
