const FireBaseContainer = require("../../containers/fireBaseContainer");

module.exports = class CartDaoFirebase extends FireBaseContainer{
    constructor(){
        super("cart")
    }

    async deleteProductFromCart(id, id_prod){
        try {
            await this.query.updateOne(
                {id: id},
                {'$pull': {products: {_id: id_prod}}}
            )
        } catch (error) {
            throw new Error(error);
        }
    }
}