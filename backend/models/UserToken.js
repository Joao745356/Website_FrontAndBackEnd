const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema(
   
    {
        userID:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Donor"
        },
        token:{
            type: String,
            required: true
        },
        createdAt:{
            type:Date,
            default:Date.now,
            expires:600
        }
    }
);


module.exports = mongoose.model('Token', TokenSchema);