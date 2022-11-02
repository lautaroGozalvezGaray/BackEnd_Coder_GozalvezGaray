const FireBaseContainer = require("../../containers/fireBaseContainer");

module.exports = class CartDaoFirebase extends FireBaseContainer{
    constructor(){
        super("cart")
    }
}