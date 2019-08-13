'use strict'

/**
 * Add server
 */
const app = require('./server')

/**
 * Module dependencies
 */
const helmet = require('helmet')
const logger = require('morgan')
const expressStatusMonitor = require('express-status-monitor')
const path = require('path')
const favicon = require('serve-favicon')
const compression = require('compression')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')

/**
 * Middleware functions
 */
// Create a session cookie and store in MongoDB
// **** Need to understand this better
var sess = {
    secret: 'AFu0R9dRiDenLAp', // Need to replace with a new random string 
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: false,
    cookie: {}
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

const authenticationMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next() 
    }
    res.redirect('/login?auth=false')
}
  
/**
 * Middleware
 */
const addMiddleware = () => {
    app.use(helmet())
    app.use(logger('dev'))
    app.use(expressStatusMonitor()) // Real time metrics available at /status
    app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
    app.use(compression())
    app.use(express.static('public'))
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())
    app.disable('x-powered-by')
    app.use(session(sess))
    app.use(flash())
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        next()
    })
    // **** Need to understand this better
    require('./passport')(passport)
    app.use(passport.initialize())
    app.use(passport.session())
}

/**
 * Exports
 */
module.exports = {addMiddleware, authenticationMiddleware}