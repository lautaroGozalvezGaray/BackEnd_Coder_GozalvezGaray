const {Schema, model} = require("mongoose");
const userSchema = new Schema({
    id: {
        type: Number,
        max: 100
    },
    userName: {
        type: String,
    },
    password: {
        type: String,
        max: 200
    },
    admin: {
        type: String
    }
})

module.exports = model("users", userSchema);