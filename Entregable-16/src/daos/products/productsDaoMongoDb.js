const MongoDbContainer = require("../../container/mongoDbContainer.js");
const Products = require("../../modules/modulesProducts.js");

module.exports = class ProductsDaoMongoDb extends MongoDbContainer{
    constructor(){
        super(Products)
    }
}