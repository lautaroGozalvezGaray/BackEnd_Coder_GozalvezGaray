const Carts = require("../../models/modelsCart");
const MongoDbContainer = require("../../container/mongoDbContainer");

module.exports = class CartDaoMongoDb extends MongoDbContainer{
    constructor(){
        super(Carts)
    }

    async deleteProductFromCart(id, id_prod){
        try {
            
            return await this.model.updateOne(
                {id: id},
                {'$pull': {products: {_id: id_prod}}}
            )

        } catch (error) {
            throw new Error(error);
        }
    }
}