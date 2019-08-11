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
    }
})

/**
 * Export model
 */

module.exports = mongoose.model('User', userSchema)

