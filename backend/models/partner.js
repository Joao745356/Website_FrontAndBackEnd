const mongoose = require('mongoose')
const partnerImagePath = 'uploads/partners'
const path = require('path')

const partnerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 2,
        maxLength: 50
    },

    password:{
        type: String,
        required: true,
        minlength: 10,
    },

    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    }, 

    description:{
        type: String,
        required: true,
        minlength: 25
    },

    dateOfRegistry:{
        type: Date,
        required: true,
        default: Date.now
    },

    numberOfDonations:{
        type: Number,
        required: true,
        default: 0
    },

    imageName:{
        type: String,
        required: true,
    },

    role:{
        type: String,
        default: "partner"
    }

})

partnerSchema.virtual('imagePath').get(function(){
    if(this.imageName != null){
        return path.join('/', partnerImagePath, this.imageName)
    }
})

module.exports = mongoose.model('Partner', partnerSchema)
module.exports.partnerImagePath = partnerImagePath