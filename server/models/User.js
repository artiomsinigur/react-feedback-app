const mongoose = require('mongoose')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    idProvider: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: ['Email is required.'],
        trim: true,
        lowercase: true,
        validate(value) {
            if (!isEmail(value)) {
                throw new Error('Email must be valid.')
            }
        }
    },
    name: {
        type: String,
        trim: true
    },
    picture: {
        type: String
    },
    provider: {
        type: String,
        trim: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User