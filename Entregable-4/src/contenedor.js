const fs = require("fs");

module.exports = class Contenedor{
    
    constructor(file){
        this.file = file;
    }

    async getData(){
        const data = await fs.promises.readFile(this.file, "utf-8");
        const parseData = JSON.parse(data);
        return parseData;
    }

    async save(objet){
        try {
            const data = await this.getData();
            
            if(data.length !== 0){
                await fs.promises.writeFile(this.file, JSON.stringify([...data, {...objet, id: data[data.length - 1].id + 1 }], null, 2), "utf-8");
            }else{
                await fs.promises.writeFile(this.file, JSON.stringify([{...objet, id:1}]), "utf-8");
            }

        } catch (error) {
            throw new Error(`hubo un error al intentar guardar el objeto. mensaje: ${error.message}`);
        }

    }

    async getById(id){
        try {
          const data = await this.getData();
          return data.find(producto => producto.id == id);
        } catch (error) {
            throw new Error(`no se encontro el objeto con id: ${id}. mensaje: ${error.message}`);
        }
    }

    async getAll(){
        const data = await this.getData();

        return data;
    }

    async updateById(id, body){
        
        try {
            const data = await this.getData();
        
            const productToUpdate = data.find(product => product.id == id);

            if(productToUpdate){
                const index = data.indexOf(productToUpdate);
                
                const {title, price, thumbnail} = body;

                data[index].title = title;
                data[index].price = price;
                data[index].thumbnail = thumbnail;

                await fs.promises.writeFile(this.file, JSON.stringify(data, null, 2) , "utf-8");
            }
        } catch (error) {
            throw new Error(`There was an error trying to modify the product. Error = ${error.message}`);
        }

    }

    async deleteById(id){
        try {
            
            const data = await this.getData();
            

            const objetIdRemove = data.find(product => product.id == id);

            if(objetIdRemove){
                const index = data.indexOf(objetIdRemove);
                data.splice(index, 1);
                await fs.promises.writeFile(this.file, JSON.stringify(data));
            }else{
                console.log(`el objeto con id ${id} no existe`);
                return null;
            }



        } catch (error) {
            throw new Error(`ocurrio un error al eliminar le obj. error: ${error.message}`);
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.file,JSON.stringify([],null,2));
        } catch (error) {
            return `No se pueden borrar los datos`;
        }
    } 



}



