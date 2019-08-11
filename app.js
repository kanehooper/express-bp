'use strict'

/**
 * Module dependencies
 */
const throng = require('throng')
const chalk = require('chalk')

// Load environment variables
require('dotenv').config()
const PORT = process.env.PORT || 3000

// Start cluster workers
const start = () => {
    // Start Express server
    const server = require('./config/server')
    server.listen(PORT, () => console.log(`${chalk.green('✓')} Server listening on port ${PORT}`))
    chalk.green('✓')
    // Start mongodb database
    require('./databases/mongo_database')
}

// Set number of cluster workers based on Heroku dyno concurrency
const WORKERS = process.env.WEB_CONCURRENCY || 1

// Create cluster workers
throng({
    workers: WORKERS,
    lifetime: Infinity
}, start)

// Test deploy