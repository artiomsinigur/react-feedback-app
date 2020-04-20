const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('<h1>Home page</h1><a href="auth/google">google</a> <a href="auth/facebook">facebook</a> <a href="auth/twitter">twitter</a> <a href="auth/github">github</a>')
})

module.exports = router