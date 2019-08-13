const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = require('../models/user_model')

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            User.findOne({email})
                .then(user => {
                    if(!user) {
                        return done(null, false, {msg: 'That email is not registered'})
                    }

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err

                        if(isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, {msg: 'Password incorrect'})
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    
    passport.deserializeUser((userID, done) => {
        User.findById(userID, (err, user) => {
            done(err, user)
        })
    })
}