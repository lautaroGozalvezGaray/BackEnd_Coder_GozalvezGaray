const MongoDbContainer = require("../../container/mongoDbContainer");
const Products = require("../../models/modelsProducts.js");

module.exports = class ProductsDaoMongoDb extends MongoDbContainer{
    constructor(){
        super(Products)
    }
}