const {MONGO_URL} = require("../config/config");
module.exports = class MongoDbContainer{
    constructor(model){
        this.model=model;
        this.connect();
    }

    connect(){
        try {
            const URL = MONGO_URL; //para mongodb local
            mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology:true })
            console.log("base de datos conectada");
        } catch (error) {
            console.log(error);
        }
    }

    async exists(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            return await this.model.find();
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getById(objectId) {
        try {
            const product = await this.model.findOne({
                _id : objectId
            })
            console.log(product);
            return product;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    async save(object) {
        try {
            return await this.model.create(object)
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteById(id) {
        try {
            return await this.model.findByIdAndDelete({_id: id})
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateById(id, data){
        try {
            await Usuarios.updateOne({_id:id}, {$set:data})
        } catch (error) {
            
        }
    }

}