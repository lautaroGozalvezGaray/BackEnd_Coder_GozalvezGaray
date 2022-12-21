const {Schema, model} = require("mongoose");

const messageSchema = new Schema({
    email: {
        type: String,
        required: true,
        max: 100
    },
    message: {
        type: String,
        required: true,
        max:200
    },
    timestrap:{type: Date, default:Date.now},
})

module.exports = model("messages", messageSchema);