const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/login', async (req, res) => {
    res.send('<h1>Veuillez vous connecter</h1>')
})
router.get('/login/success', (req, res) => {
    res.send(req.user)
})
router.get('/logout', (req, res) => {
    res.send('<h1>You are logout</h1>')
})

// Google passport routers
// ===========================//
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/auth/google/callback',
    passport.authenticate('google', ({ failureRedirect: '/' })), 
    (req, res) => {
        res.redirect('/login/success')
    })

// Facebook passport routers
// ===========================//
router.get('/auth/facebook', passport.authenticate('facebook'))
router.get('/auth/facebook/callback', passport.authenticate('facebook', ({ failureRedirect: '/', successRedirect: '/login/success' })))

// Twitter passport routers
// ===========================//
router.get('/auth/twitter', passport.authenticate('twitter'))
router.get('/auth/twitter/callback', passport.authenticate('twitter', ({ failureRedirect: '/', successRedirect: '/login/success' })))

// Github passport routers
// ===========================//
router.get('/auth/github', passport.authenticate('github'))
router.get('/auth/github/callback', passport.authenticate('github', ({ failureRedirect: '/', successRedirect: '/login/success' })))

module.exports = router