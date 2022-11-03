const {Schema, model} = require("mongoose");

const productsSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 100
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        max: 500
    },
    code: {
        type: String,
        required: true,
        max: 6,
    },
    image: {
        type: String,
        max: 200
    },
    stock: {
        type: Number,
        required: true,
        max: 5000
    }
})

module.exports = model("products", productsSchema);