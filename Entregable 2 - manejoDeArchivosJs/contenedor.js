const fs = require("fs");

class Contenedor{
    
    constructor(file){
        this.file = file;
    }

    async getData(){
        const data = await fs.promises.readFile(this.file, "utf-8");
        return data;
    }

    async save(objet){
        try {
            const data = await fs.promises.readFile(this.file, "utf-8");
            const parseData = JSON.parse(data);

            objet.id = parseData.length + 1 ;
            parseData.push(objet);

            await fs.promises.writeFile(this.file, JSON.stringify(parseData, null, 2));
            
            return objet.id;

        } catch (error) {
            throw new Error(`hubo un error al intentar guardar el objeto. mensaje: ${error.message}`);
        }

    }

    async getById(id){
        try {
          const data = await this.getData();
          const parsedData = JSON.parse(data);
    
          return parsedData.find((producto) => producto.id === id);
        } catch (error) {
            throw new Error(`no se encontro el objeto con id: ${id}. mensaje: ${error.message}`);
        }
      }

    async getAll(){
        const data = await this.getData();

        return JSON.parse(data);
    }

    async deleteById(id){
        try {
            
            const data = await this.getData();
            const parseData = JSON.parse(data);

            const objetIdRemove = parseData.find((product)=>product.id === id);

            if(objetIdRemove){
                const index = parseData.indexOf(objetIdRemove);
                parseData.splice(index, 1);
                await fs.promises.writeFile(this.file, JSON.stringify(parseData));
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
            await fs.promises.writeFile(this.file,JSON.stringify([],null,2))
        } catch (error) {
            return `No se pueden borrar los datos`
        }
    } 



}

module.exports = Contenedor;

