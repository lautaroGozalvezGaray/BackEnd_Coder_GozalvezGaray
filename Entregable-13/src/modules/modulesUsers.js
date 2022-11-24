const {Schema, model} = require("mongoose");
const userSchema = new Schema({
    id: {
        type: Object,
        max: 100
    },
    username: {
        type: Object,
    },
    password: {
        type: Object,
        max: 200
    },
    admin: {
        type: String
    }
})

module.exports = model("users", userSchema);