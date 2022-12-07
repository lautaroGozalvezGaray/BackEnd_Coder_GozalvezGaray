const MongoDbContainer = require("../../container/mongoDbContainer.js");
const Users = require("../../modules/modulesUsers.js");

module.exports = class ProductsDaoMongoDb extends MongoDbContainer{
    constructor(){
        super(Users)
    }
}