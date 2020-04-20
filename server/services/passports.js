require('dotenv').config()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
const GithubStrategy = require('passport-github').Strategy
const User = require('../models/User')

// Serialization is when the user gets encrypted from the database and sends it back to the browser as a cookie. 
passport.serializeUser((user, done) => {
    // user.id referees to mongodb _id
    done(null, user.id)
})

// Deserialization is when the user cookie gets decrypted from the browser to the database.
passport.deserializeUser( async(id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        done(error, null)
    }
})

// Google passport strategy
// ===========================//
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3000/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
        const { sub, name, email, picture } = profile._json
        
        try {
            // If user exists, fetch it from DB
            const user = await User.findOne({ idProvider: sub })
            if (user) {
                return done(null, user)
            } else {
                // If new user, store it in DB
                const newUser = new User({ idProvider: sub, name, email, picture })
                await newUser.save()
                return done(null, newUser)
            }
        } catch (error) {
            console.log(error)
        }
    }
))

// Facebook passport strategy
// ===========================//
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refreshToken, profile, cb) => {
        const { id, displayName, email } = profile._json
        console.log('profile ', profile)
        // User.findOrCreate({ googleId: profile.id }, (err, user) => {
        //     return cb(err, user)
        // })
    }
))

// Twitter passport strategy
// ===========================//
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRET,
    callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback',
    includeEmail: true
}, (accessToken, refreshToken, profile, cb) => {
        const { id, name, email } = profile._json
        console.log('profile ', profile)
        return cb(err, profile)
        // User.findOrCreate({ googleId: profile.id }, (err, user) => {
        //     return cb(err, user)
        // })
    }
))

// Github passport strategy
// ===========================//
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback",
    scope: 'user:email',
}, (accessToken, refreshToken, profile, cb) => {
        const { id, name } = profile._json
        console.log('profile ', profile)
        console.log('email ', profile.emails[0].value)
        return cb(err, profile)
        // User.findOrCreate({ googleId: profile.id }, (err, user) => {
        //     return cb(err, user)
        // })
    }
))
