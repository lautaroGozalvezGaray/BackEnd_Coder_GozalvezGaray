const fs = require("fs");

const Contenedor = require("./contenedorProducts");

module.exports = class Cart extends Contenedor{


    //METODO PARA AGREGAR UN PRODUCTO AL CARRITO SELECCIONADO
    async addToCartById(id, product){
        const data = await this.getData();

        try {
            //buscamos el cart mediante id
            const CartToUpdate = data.find(cart => cart.id == id);


            if(CartToUpdate){

                //obtenemos el indice del cart 
                const index = data.indexOf(CartToUpdate);

                //obtenemos el cart completo
                const cartNow = data[index];

                //traemos todos los productos
                const cartProducts = cartNow.products;

                //pusheamos el producto
                cartProducts.push(product);

                await fs.promises.writeFile(this.file, JSON.stringify(data, null, 2) , "utf-8")
                
                

                return true;

            }else{
                console.log(`The ${id} does not exist in the file`);

                return false;
            }


        } catch (error) {
            console.log("There is a problem trying to update the cart");
            console.log(`Error: ${error.message}`);
        }



    }



    //METODO PARA ELIMINAR UN PRODUCTO DEL CARRITO SELECCIONADO
    async deleteProductFromCart(id, idProd){
        
        
        try {

            const data = await this.getData();
            
            //buscamos el cart mediante id
            const cartToModify = data.find(cart => cart.id == id);

            

            if(cartToModify){
                //vemos en que posicion esta el cart dentro de todos y guardamos su indice
                const index = data.indexOf(cartToModify);
                
                //buscamos traemos toda la info del cart
                const cartNow = data[index];

                //traemos todos los productos del cart
                const cartProducts = cartNow.products;
            
                //buscamos el producto que queremos eliminar mediante id
                const objetIdRemove = cartProducts.find(product => product.id == idProd);
            

                if(objetIdRemove){
                    const index = cartProducts.indexOf(objetIdRemove);
                    
                    cartProducts.splice(index, 1);

                    await fs.promises.writeFile(this.file, JSON.stringify(data, null, 2) , "utf-8")

                    return true;
                }else{
                    console.log("The objet to remove does not exist");

                    return false;
                }

            }else{
                console.log("The cart does not exist");
                return false;
            }

        } catch (error) {
            console.log("There is a problem trying to delete the product from cart");
            console.log(`Error: ${error.message}`);
        }
    }

}