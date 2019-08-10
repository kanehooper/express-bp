'use strict'

/**
 * Module dependencies
 */
const express = require('express')
const helmet = require('helmet')
const path = require('path')
const logger = require('morgan')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const expressStatusMonitor = require('express-status-monitor')

// Generate express app and export it
const app = module.exports = express()

// Set view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))

/**
 * Middleware
 */
app.use(expressStatusMonitor()) // Real time metrics available at /status
app.use(helmet())
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
app.use(compression())
app.use(express.static('public'))
app.use(logger('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.disable('x-powered-by')

// Controllers
const homeController = require('../controllers/home')

/**
 * Primary app routes
 */
app.get('/', homeController.index)

/**
 * API routes
 */


// 404 handling
app.use((req, res) => {
    res.status(404)
    res.render('404.ejs')
})

 // Error handling
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(err.status || 500)
    res.json({error: err.message})
})



