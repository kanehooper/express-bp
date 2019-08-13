'use strict'

/**
 * Module dependencies
 */
const bcrypt = require('bcryptjs')
const UserModel = require('../../models/user_model')
const passport = require('passport')

/**
 * Functions
 */
// **** Need to understand this better


/**
 * GET /signup
 * Signup page
 */
exports.signup = ((req, res) => {
    res.render('signup', {title: 'Express boilerplate - signup'})
})
   
/**
 * POST /register
 * Registration processing route
 */
exports.register = ((req, res) => {
    // Retrieve form data
    const {firstName, lastName, email, password, passwordConfirm } = req.body

    // Error handling
    // *** TODO: Replace with an error handling library maybe Joi
    let errors = []
    
    // Check required fields
    if (!firstName || !lastName || !email) {
        errors.push({msg: 'Please fill in all fields'})
    }

    // Check pass length
    if (password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters'})
    }
    
    // Check passwords match
    if (password !== passwordConfirm) {
        errors.push({msg: 'Passwords do not match'})
    }

    // *** TODO: Check for unique emails 

    // Return errors
    if(errors.length > 0) {
        return res.render('signup', {
            title: 'Express boilerplate - signup', 
            errors,
            firstName,
            lastName,
            email
        })
    } 

    // Hash password
    // *** TODO: Fix undandledPromiseRejectionWarning
    const saltRounds = 12
    bcrypt.hash(password, saltRounds)
        .then(hash => {
            // Create model
            const user = new UserModel({
                firstName,
                lastName,
                email,
                password: hash
            })
            return user.save()
        })
        .then(user => {
            const {_id: userID} = user
            req.flash('success_msg', 'You are now registered and can log in')
            res.redirect('login')
        })
        .catch(err => {
            // *** TODO: Need to handle errors from database
            console.error(err)
            res.send({message: 'Failed to create user'})
        })
})


/**
 * GET /login
 * Login page
 */
exports.login = ((req, res) => {
    res.render('login', {title: 'Express boiler plate - login'})
})

/**
 * GET /logout
 * Logout page
 */
exports.logout = ((req, res) => {
    res.render('users/logout', {title: 'Express boiler plate - logout'})
})

/**
 * GET /profile
 * User profile page
 */
exports.profile = ((req, res) => {
    res.render('users/profile', {title: 'Express boilerplate - profile'})
})