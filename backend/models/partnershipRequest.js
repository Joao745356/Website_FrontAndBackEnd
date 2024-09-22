const mongoose = require('mongoose')
const partnerImagePath = 'uploads/partners'
const path = require('path')

const partnershipSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },

    password:{
        type: String,
        required: true,
        
    }, 

    description:{
        type: String,
        required: true
    },

    dateOfRegistry:{
        type: Date,
        required: true,
        default: Date.now
    },

    imageName:{
        type: String
    },

    accepted:{
        type: Boolean,
        required: true,
        default: false
    }
})

partnershipSchema.virtual('imagePath').get(function(){
    if(this.imageName != null){
        return path.join('/', partnerImagePath, this.imageName)
    }
})

module.exports = mongoose.model('Partnership', partnershipSchema)
module.exports.partnerImagePath = partnerImagePath