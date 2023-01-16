const {Schema, model} = require("mongoose");

const productsSchema = new Schema({
    title: {
        type: String,
        max: 100
    },
    price: {
        type: Number,
    },
    thumbnail: {
        type: String,
        max: 200
    }
})

module.exports = model("products", productsSchema);