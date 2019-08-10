'use strict'

/**
 * Module dependencies
 */
const express = require('express')
const path = require('path')

/**
 * Generate express app and export
 */
const app = module.exports = express()

/**
 * View Engine
 */
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))

/**
 * Add Middleware
 */
const addMiddleware = require('./middleware')
addMiddleware()

/**
 * Add Routes
 */
const addRoutes = require('./routes')
addRoutes()
