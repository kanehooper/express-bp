'use strict'

/**
 * Module dependencies
 */
const express = require('express')
const path = require('path')

/**
 * Generate express app
 */
const app = express()

/**
 * View Engine
 */
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))

/**
 * Add Middleware
 */
require('./middleware')()

/**
 * Add Routes
 */
require('./routes')()

/**
 * Exports
 */
module.exports = app

