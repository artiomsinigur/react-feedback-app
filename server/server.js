const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => res.send( {say: 'Hello publish only on heroku'} ))

app.listen(PORT, () => console.info('Server is up on port ' + PORT))