const MongoDbContainer = require("../../containers/mongoDbContainer");
const Products = require("../../modules/modulesProducts");

module.exports = class ProductsDaoMongoDb extends MongoDbContainer{
    constructor(){
        super(Products)
    }
}