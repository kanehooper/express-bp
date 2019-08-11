'use strict'

/**
 * Module dependencies
 */
const bcrypt = require('bcrypt')
const UserModel = require('../../models/user_model')

/**
 * GET /
 * Home page
 */
exports.index = ((req, res) => {
    res.render('index', {title: 'Express boilerplate'})
})

/**
 * GET /signup
 * Signup page
 */
exports.signup = ((req, res) => {
  res.render('signup', {title: 'Express boilerplate - signup'})
})

/**
 * GET /login
 * Login page
 */
exports.login = ((req, res) => {
  res.render('login', {title: 'Express boiler plate - login'})
})

/**
 * POST /register
 * Registration processing route
 */
exports.register = ((req, res) => {
  // Retrieve form data
  const {firstName, lastName, email, password } = req.body
  
  // Hash password
  const saltRounds = 10
  bcrypt.hash(password, saltRounds, (err, hash) => {
    // Create model
    const user = new UserModel({
      firstName,
      lastName,
      email,
      password: hash
    })

    // Save to MongoDB
    user.save()
      .then(doc => {
        console.log(doc)
        res.send({message: 'User saved'})
      })
      .catch(err => {
        console.error(err)
        res.send({message: 'Failed to create user'})
      })
  })
})

/**
 * GET /error
 * Test error page
 */
exports.error = ((req, res, next) => {
    setTimeout(function () {
        try {
          throw new Error('This is an error test')
        } catch (err) {
          err.status = 500
          next(err)
        }
      }, 100)
})

