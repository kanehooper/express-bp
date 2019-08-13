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
 * Database class
 */
class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
            .then(() => console.log(`${chalk.green('✓')} Connected to MongoDB`))
            .catch(err => console.log(`${chalk.green('✓')} Connected to MongoDB`))
    }
}

module.exports = new Database()