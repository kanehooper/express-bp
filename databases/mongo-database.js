'use strict'

/**
 * Module dependencies
 */
const mongoose = require('mongoose')
const chalk = require('chalk')

/**
 * Load environment variables
 */
require('dotenv').config()

/**
 * Connect to MongoDB
 */
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}, (err, res) => {
    if (err) {
        console.log(chalk.red(`Error connecting to ${mongoURL}. ${err}`))
    } else {
        console.log(`${chalk.green('✓')} Connected to MongoDB`)
    }
})

/**
 * Check for connection errors
 */
mongoose.connection.on('error', (err) => {
    console.error(err)
    console.log(`${chalk.red('✗')} MongoDB connection error.`)
    process.exit()
})