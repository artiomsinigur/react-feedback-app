require('dotenv').config()
const express       = require('express')
const app           = express()
require('./config/mongoose')
const bodyParser    = require('body-parser')
const cookieParser  = require('cookie-parser')
const cookieSession = require('cookie-session')
const session       = require('express-session')
const passport      = require('passport')
require('./services/passports')
const appRouters    = require('./routers/app')
const authRouters   = require('./routers/auth-routers')

// App configuration
const PORT = process.env.PORT || 3000

// get information from html forms
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// read cookies (needed for auth)
app.use(cookieParser())
app.use(cookieSession({
    name: 'feedback',
    keys: [process.env.COOKIE_KEY],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
// required for twitter passport
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(passport.initialize())
// deserialize cookie from the browser
app.use(passport.session()) 

app.use(appRouters)
app.use(authRouters)


app.listen(PORT, () => console.info('Server is up on port ' + PORT))