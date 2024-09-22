const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    sponsor:{
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true,
        min: [0, 'Value must be a positive number']
    },
    cost: {
        type: Number,
        required: true,
        min: [0, 'Cost must be a positive number']
    }
});

module.exports = mongoose.model('Coupon', couponSchema)