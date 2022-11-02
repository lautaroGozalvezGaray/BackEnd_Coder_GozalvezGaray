class MemoryContainer {

    constructor() {
        this.elements = []
    }

    getById(id) {
        try {
            return this.elements.find(producto => producto.id == id);
          } catch (error) {
              throw new Error(`the object was not found with id: ${id}. mensaje: ${error.message}`);
          }
    }

    getAll() {
        return [...this.elements]
    }

    save(objet) {

        try {
            let newId
            if (this.elements.length == 0) {
                newId = 1
            } else {
                newId = this.elements[this.elements.length - 1].id + 1
            }

            const newElem = { ...objet, id: newId }
            this.elements.push(newElem)
            return newElem
        } catch (error) {
            throw new Error(`There was an error trying to save the object: ${error.message}`);
        }
    }

    updateById(id, body) {
        try {
            
            const productToUpdate = this.elements.find(product => product.id == id);

            if(productToUpdate){
                const index = this.elements.indexOf(productToUpdate);
                
                const {thumbnail, title, price, description, code, image, stock } = body;

                this.elements[index].title = title;
                this.elements[index].price = price;
                this.elements[index].thumbnail = thumbnail;
                this.elements[index].description = description;
                this.elements[index].code = code;
                this.elements[index].image = image;
                this.elements[index].stock = stock;
            }
        } catch (error) {
            throw new Error(`There was an error trying to modify the product. Error = ${error.message}`);
        }
    }

    deleteBy(id) {
        try {
          
            const objetIdRemove = this.elements.find(product => product.id == id);

            if(objetIdRemove){
                const index = this.elements.indexOf(objetIdRemove);
                data.splice(index, 1);
            }else{
                console.log(`The objet whit id:  ${id} does not exist`);
                return null;
            }
        } catch (error) {
            throw new Error(`There was an error trying to delete the obj. error: ${error.message}`);
        }
    }

    deleteAll() {
        this.elements = []
    }
}

export default MemoryContainer;

