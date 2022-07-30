const fs = require("fs");

class Contenedor{
    
    constructor(file){
        this.file = file;
        this.readOrCreateFile()
    }

    async readOrCreateFile() {
        try {
          await fs.promises.readFile(this.file, "utf-8");
        } catch (error) {
          error.code === "ENOENT"
            ? this.createEmptyFile()
            : console.log(
                `Error Code: ${error.code} | There was an unexpected error when trying to read ${this._filename}`
            );
        }
      }

    async createEmptyFile(){
        let result = []
        fs.promises.writeFile(this.file, JSON.stringify(result, null ,2))
    }

    async getData(){
        const data = await fs.promises.readFile(this.file, "utf-8");
        return data;
    }

    async save(objet){
        try {
            const allData = await this.getData();
            const parseData = JSON.parse(allData);

            objet.id = parseData.length + 1 ;
            parseData.push(objet);

            await fs.promises.writeFile(this.file, JSON.stringify(parseData));
            
            return objet.id;

        } catch (error) {
            /* throw new Error(`hubo un error al intentar guardar el objeto. mensaje: ${error.message}`)  */
            console.log(
                `Error Code: ${error.message}`
              );
        }

    }

    async getById(id){
        try {
            const data = await this.getData();
            parseData = JSON.parse(data);

            return parseData.find((product)=>{product.id === id });
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

            const objetIdRemove = parseData.find((product)=>{product.id === id});

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

