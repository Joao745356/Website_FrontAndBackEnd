const mongoose = require('mongoose')

const donorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 2, // Minimum length of 3 characters
        maxlength: 30 // Maximum length of 50 characters
        
    },
    
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },

    password:{
        type: String,
        required: true,
        minlength:10
    },

    pointsEarned:{
        type: Number,
        default: 0,
        required:true
    },

    role:{
        type: String,
        required: true,
        default: 'donor',
    },

    coupons: [mongoose.Schema.Types.ObjectId]
})


module.exports = mongoose.model('Donor', donorSchema)