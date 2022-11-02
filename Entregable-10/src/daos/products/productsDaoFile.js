const fs = require("fs");

const FileContainer = require("../../containers/fileContainer");

module.exports = class productsDaoFile extends FileContainer{
    constructor(){
        super("db/products.json")
    }
}