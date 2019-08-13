'use strict'



/**
 * GET /
 * Home page
 */
exports.index = ((req, res) => {
  console.log(req.user)
  console.log(req.isAuthenticated())
  res.render('index', {title: 'Express boilerplate'})
})

/**
 * GET /error
 * Test error page
 */
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

