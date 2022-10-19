const knex = require('knex');

module.exports = class DataBase{

    constructor(config, table){
        this.knex = knex(config);
        this.table = table;
    }

    async save(objet){
        try {
            return await this.knex(`${this.table}`).insert(objet);
        } catch (error) {
            throw new Error(`There was an error trying to save the object: ${error.message}`);
        }
    }

    async getById(id){
        try {
            return await this.knex(`${this.table}`).select("*").where("id",id)
        } catch (error) {
            throw new Error(`the object was not found with id: ${id}. message: ${error.message}`)
        }
    }

    async getAll(){
        try {
            return await this.knex(`${this.table}`).select("*");
        } catch (error) {
            throw new Error(`there is a problema trying all data. message: ${error.message}`);
        }
    }

    async updateById(id, objet){
        try {
            return await this.knex(`${this.table}`).update(objet).where("id", id)
        } catch (error) {
            throw new Error(`There was an error trying to modify the product. Error = ${error.message}`);
        }
    }

    async deleteById(id){
        try {
            return await this.knex(`${this.table}`).where("id", id).del();
        } catch (error) {
            throw new Error(`There was an error trying to delete the obj. error: ${error.message}`);
        }
    }

    async deleteAll(){
        try {
            return await this.knex(`${this.table}`).select("*").del();
        } catch (error) {
            throw new Error(`data can not be delete. error: ${error.message}`);
        }
    }
}