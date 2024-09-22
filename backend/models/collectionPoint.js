const mongoose = require('mongoose')

const collectionPointSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true
    },

    coordsLatitude:{
        type: Number,
        required: true
    },

    coordsLongitude:{
        type: Number, 
        required: true
    },
    
    numberOfDonationsProcessed:{
        type: Number, 
        required: true,
        default: 0
    },
})


module.exports = mongoose.model('CollectionPoint', collectionPointSchema)