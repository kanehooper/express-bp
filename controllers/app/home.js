'use strict'

/**
 * GET /
 * Home page
 */

exports.index = ((req, res) => {
    res.render('index', {title: 'Express boiler plate'})
})

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

