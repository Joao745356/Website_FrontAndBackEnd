const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
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
        default: 'admin',
    }
})

module.exports = mongoose.model('Admin', adminSchema)