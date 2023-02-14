const MongoDbContainer = require("../../../data_Persistence/container/mongoDbContainer.js");
const Messages = require("../../../data_Persistence/models/modelsMessage");

module.exports = class ProductsDaoMongoDb extends MongoDbContainer{
    constructor(){
        super(Messages)
    }
}