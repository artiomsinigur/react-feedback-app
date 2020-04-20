const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('<h1>Home page</h1><a href="auth/google">google</a> <a href="auth/facebook">facebook</a> <a href="auth/twitter">twitter</a> <a href="auth/github">github</a>')
})

router.get('/profile', (req, res) => {
    res.send(req.user)
    // res.send(req.session)
})

router.get('/logout', (req, res) => {
    req.logout()
    res.send(req.user)
})

module.exports = router