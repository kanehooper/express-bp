'use strict'

/**
 * Module dependencies
 */
const mongoose = require('mongoose')
const validator = require('validator')

/**
 * Create User schema
 */
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: false,
    },
    lastName: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

/**
 * Export model
 */
module.exports = mongoose.model('User', userSchema)

