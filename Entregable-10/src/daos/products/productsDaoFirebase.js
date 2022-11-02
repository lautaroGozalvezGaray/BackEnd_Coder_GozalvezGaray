const FireBaseContainer = require("../../containers/fireBaseContainer");


module.exports = class ProductsDaoFirebase extends FireBaseContainer{
    constructor(){
        super("products")
    }
}