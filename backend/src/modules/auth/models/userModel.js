import { request } from "express";
import mongoose from "mongoose";
import { validation } from "../../../shared/constant";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
        maxLength: [validation.nameMaxLength, `name cannt exceed ${validation.nameMaxLength} characters`]
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^\s+@\s+\.\s+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [validation.passMinLength, `password must be at least ${validation.passMinLength} characters`],
        select: false
    }
},
    {
        timestamps: true,
        versionKey: false
    })

export const User = mongoose.models.User || mongoose.models("User", userSchema)