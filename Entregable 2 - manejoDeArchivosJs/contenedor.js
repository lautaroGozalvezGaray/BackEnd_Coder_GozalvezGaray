const fs = require("fs");

class Contenedor{
    
    constructor(file){
        this.file = file;
    }

    async createEmptyFile(){
        fs.writeFile(file, [], (error)=>{
            error 
            ? console.log(error.message)
            :  console.log(`El archivo ${this.file} se creó con exito.`)
        })
    }

    async getData(){
        const data = await fs.promises.readFile(file, "utf-8");
        return data;
    }

    async save(objet){
        try {
            const allData = await this.getData();

            objet.id = allData.length + 1 ;
            allData.push(objet);

            await fs.promises.writeFile(this.file, allData);
            
            return objet.id;

        } catch (error) {
            console.log(`mensaje: ${error.message}. hubo un error intentando guardar el objeto`);
        }

    }

    async getById(){
        try {
            const data = await this.getData();

            return data.find((product)=>{product.id === id });
        } catch (error) {
            console.log(`mensaje: ${error.message} no se encontro el objeto con id: ${id}`);
            return null;
        }
    }

    async getAll(){
        const data = await this.getData();

        allProducts = [...data];
    }

    async deleteById(id){
        try {
            
            const data = await this.getData();

            const objetIdRemove = data.find((product)=>{product.id === id});

            if(objetIdRemove){
                const index = data.indexOf(objetIdRemove);
                data.splice(index, 1);
            }



        } catch (error) {
            
        }
    }



}