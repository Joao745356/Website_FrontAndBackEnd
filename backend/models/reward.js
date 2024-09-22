const mongoose = require('mongoose')

const rewardSchema = new mongoose.Schema({
    baseQuantity:{
        type: Number,
        required: true,
        default: 0
    },
    points:{
        type: Number,
        required: true,
        default: 0
    },
    poorPercentage:{
        type:Number,
        min:1,
        max: 100,
        default:100
    },
    fairPercentage:{
        type:Number,
        min:1,
        max: 100,
        default:100,

    },
    goodPercentage:{
        type:Number,
        min:1,
        max: 100,
        default:100,

    },
    excellentPercentage:{
        type:Number,
        min:1,
        max: 100,
        default:100,

    },
    
})

module.exports = mongoose.model('Reward', rewardSchema)