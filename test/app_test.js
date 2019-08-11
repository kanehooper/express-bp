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

describe('GET /signup', () => {
    it('should return 200 OK', (done) => {
        request(app)
            .get('/signup')
            .expect(200, done)
    })
})

describe('GET /login', () => {
    it('should return 200 Ok', (done) => {
        request(app)
            .get('/login')
            .expect(200, done)
    })
})

describe('POST /register', () => {
    it('should return 200 Ok', (done) => {
        request(app)
            .post('/register')
            .expect(200, done)
    })
})

describe('404 route', () => {
    it('should return 404 not found', (done) => {
        request(app)
            .get('/this-is-not-a-valid-route')
            .expect(404, done)
    })
})

describe('Default express error handler', () => {
    it('should return an error', (done) => {
        request(app)
            .get('/error_test')
            .expect(500, done)
    })
})

// Add tests here for all new app routes added

/**
 * Test API routes
 */

// Add tests here for all new API routes added