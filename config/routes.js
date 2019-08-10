'use strict'

/**
 * Include server
 */
const app = require('./server')

/**
 * Routes
 */
const addRoutes = () => {
    // Incldue controllers
    const homeController = require('../controllers/app/home')

    // Add primary app routes
    app.get('/', homeController.index)
    app.get('/error_test', homeController.error)
    // Add other app routes here

    // Add API routes
    // Add API routes here //

    // Add 404 response
    app.use((req, res) => {
        res.status(404)
        res.render('404.ejs')
    })

    // Add default error handling
    app.use((err, req, res, next) => {
        if (res.headersSent) {
            return next(err)
        }
        res.status(err.status || 500)
        res.json({error: err.message})
    })
}

/**
 * Exports
 */
module.exports = addRoutes