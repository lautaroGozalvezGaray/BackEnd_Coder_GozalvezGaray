const MongoDbContainer = require("../../../data_Persistence/container/mongoDbContainer");
const Users = require("../../../data_Persistence/models/modelsUsers");

module.exports = class ProductsDaoMongoDb extends MongoDbContainer{
    constructor(){
        super(Users)
    }
}