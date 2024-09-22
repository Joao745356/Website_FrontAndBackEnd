const mongoose = require('mongoose')

const staffSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },

    password:{
        type: String,
        required: true
    },

    role:{
        type: String,
        required: true,
        default: 'staff',
    }
})

module.exports = mongoose.model('Staff', staffSchema)