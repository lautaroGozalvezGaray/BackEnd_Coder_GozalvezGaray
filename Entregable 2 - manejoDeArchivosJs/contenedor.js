const fs = require("fs");

class Contenedor{
    
    constructor(file){
        this.file = file;
    }

    async getData(){
        const data = await fs.promises.readFile(file, "utf-8");
        return data;
    }

    async save(objet){
        allData = await this.getData();
        
    }



}