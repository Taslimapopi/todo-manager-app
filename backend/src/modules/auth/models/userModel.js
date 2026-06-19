
import mongoose from "mongoose";
import { validation } from "../../../shared/constant.js";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      maxLength: [
        validation.nameMaxLength,
        `name cannt exceed ${validation.nameMaxLength} characters`,
      ],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [
        validation.passMinLength,
        `password must be at least ${validation.passMinLength} characters`,
      ],
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save',async function (next) {
  if(!isModified('password')) return next()
    try{
  this.password= await bcrypt.hash(this.password,validation.bcrypt_salt_round)
  next()
  }catch(error){
    next(error)
  }
  
})

export const User = mongoose.models.User || mongoose.model("User", userSchema);
