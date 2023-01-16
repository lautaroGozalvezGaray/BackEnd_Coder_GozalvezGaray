const MongoDbContainer = require("../../container/mongoDbContainer.js");
const Messages = require("../../modules/modulesMessage.js");

module.exports = class ProductsDaoMongoDb extends MongoDbContainer{
    constructor(){
        super(Messages)
    }
}