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
    name:{
        type: String,
        max: 15
    },
    adress:{
        type: Object,
        max: 200
    },
    age:{
        type: Number,
        max:10
    },
    phone:{
        type:Number,
        max: 25
    },
    avatar:{
        type:Object,
        
    }
})

module.exports = model("users", userSchema);