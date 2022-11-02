const Carts = require("../../modules/modulesCart");
const MongoDbContainer = require("../../containers/mongoDbContainer");

module.exports = class CartDaoMongoDb extends MongoDbContainer{
    constructor(){
        super(Carts)
    }
}