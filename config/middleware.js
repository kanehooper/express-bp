'use strict'

/**
 * Add server
 */
const app = require('./server')

/**
 * Module dependencies
 */
const helmet = require('helmet')
const expressStatusMonitor = require('express-status-monitor')
const path = require('path')
const favicon = require('serve-favicon')
const compression = require('compression')
const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')

/**
 * Middleware
 */
const addMiddleware = () => {
    app.use(helmet())
    app.use(expressStatusMonitor()) // Real time metrics available at /status
    app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
    app.use(compression())
    app.use(express.static('public'))
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())
    app.use(logger('dev'))
    app.use(cookieParser())
    app.disable('x-powered-by')
}

/**
 * Exports
 */
module.exports = addMiddleware