const {Schema, model} = require("mongoose");

const cartsSchema = new Schema({
    timestrap:{type: Date, default:Date.now},
    products:[
        {
            type: Schema.Types.ObjectId,
            ref: "products"
        }
    ]
})

module.exports = model("carts", cartsSchema);