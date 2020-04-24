const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/login', async (req, res) => {
    res.send('<h1>Veuillez vous connecter</h1>')
})

router.get('/api/profile', (req, res) => {
    res.send(req.user)
    // res.send(req.session)
})

router.get('/api/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

// Google passport routers
// ===========================//
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/auth/google/callback',
    passport.authenticate('google', ({ failureRedirect: '/' })), 
    (req, res) => {
        res.redirect('/survey')
    })

// Facebook passport routers
// ===========================//
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }))
router.get('/auth/facebook/callback', passport.authenticate('facebook', ({ failureRedirect: '/', successRedirect: '/survey' })))

// Twitter passport routers
// ===========================//
router.get('/auth/twitter', passport.authenticate('twitter'))
router.get('/auth/twitter/callback', passport.authenticate('twitter', ({ failureRedirect: '/', successRedirect: '/survey' })))

// Github passport routers
// ===========================//
router.get('/auth/github', passport.authenticate('github'))
router.get('/auth/github/callback', passport.authenticate('github', ({ failureRedirect: '/', successRedirect: '/survey' })))

module.exports = router