require('../config/keys')
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
    callbackURL: process.env.HOST_URL + '/auth/google/callback',
    // proxy: true
}, async (accessToken, refreshToken, profile, done) => {
        const { sub, name, email, picture } = profile._json
        const provider = profile.provider

        try {
            // If user exists, fetch it from DB
            const user = await User.findOne({ idProvider: sub })
            if (user) {
                done(null, user)
            } else {
                // If new user, store it in DB
                const newUser = new User({ idProvider: sub, name, email, picture, provider })
                await newUser.save()
                done(null, newUser)
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
}, async (accessToken, refreshToken, profile, done) => {
        const { id, name, email } = profile._json
        const provider = profile.provider
        
        try {
            const user = await User.findOne({ idProvider: id })
            if (user) {
                done(null, user)
            } else {
                const newUser = new User({ idProvider: id, email, name, provider })
                await newUser.save()
                done(null, newUser)
            }
        } catch (error) {
            console.log(error)
        }
    }
))

// Twitter passport strategy
// ===========================//
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRET,
    callbackURL: process.env.HOST_URL + '/auth/twitter/callback',
    includeEmail: true
}, async (accessToken, refreshToken, profile, done) => {
        const { id, name, email, profile_image_url } = profile._json
        const provider = profile.provider

        try {
            const user = await User.findOne({ idProvider: id })
            if (user) {
                done(null, user)
            } else {
                const newUser = new User({ idProvider: id, email, name, picture: profile_image_url, provider })
                await newUser.save()
                done(null, newUser)
            }
        } catch (error) {
            console.log(error)
        }
    }
))

// Github passport strategy
// ===========================//
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.HOST_URL + "/auth/github/callback",
    scope: 'user:email',
}, async (accessToken, refreshToken, profile, done) => {
        const { id, name, avatar_url } = profile._json
        const email = profile.emails[0].value
        const provider = profile.provider

        try {
            const user = await User.findOne({ idProvider: id })
            if (user) {
                done(null, user)
            } else {
                const newUser = new User({ idProvider: id, email, name, picture: avatar_url, provider })
                await newUser.save()
                done(null, newUser)
            }
        } catch (error) {
            console.log(error)
        }
    }
))
