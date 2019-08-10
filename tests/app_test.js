'use strict'

/**
 * Module dependencies
 */
const request = require('supertest')
const app = require('../config/server')

/**
 * Test primary app routes
 */
describe('GET /', () => {
    it('should return 200 OK', (done) => {
        request(app)
            .get('/')
            .expect(200, done)
    })
})

// Add tests here for all new app routes added