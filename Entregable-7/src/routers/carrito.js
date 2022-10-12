const express = require("express");
const moment = require("moment");

const Contenedor = require("../container/contenedorProducts");
const Cart = require("../container/conteinerCart");


const carrito = new Cart("../src/container/data/carrito.json");
const products = new Contenedor("../src/container/data/products.json");


const routerCart = express.Router();




//CREAR UN CARRITO NUEVO

routerCart.post("/", async(req, res) => {
    
    
    try {
        const {body} = req;

        
        body.timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
        body.products = [];

        const newCart = await carrito.save(body);
        console.log(newCart);
        newCart
          ? res.status(200).json({success : "cart added with ID: "+ newCart})
          : res.json({mensaje: "There are no products"});
          

    } catch(err) {
        console.log("error: " + err.message);
    }
    
})


//ELIMINAR UN CARRITO

routerCart.delete("/:id", async(req, res) => {

    const {id} = req.params;

    try {
        await carrito.deleteById(id);

        res.status(200).json({mensaje: `Cart whit ID : ${id} was deleted successfully`});
        
    } catch (err) {
        console.log("erorr: " + err.message);
    }

})

//LISTAR TODOS LOS PRODUCTOS DEL CARRTIO SEGUN ID
routerCart.get("/:id/products", async(req, res) => {
    const {id} = req.params;
    try {
        const cart = await carrito.getById(id);
        
        cart 
          ? res.status(200).json({cart_number: id, "Products ": cart.products.length>0 ? cart.products : "There aren't products"})
           
          : res.status(404).json({error: `The Cart whit ID: ${id} was not found`});
        
        
    } catch (err) {
        console.log("erorr: " + err.message);
    }
    
})

//AGREGAR UN PRODUCTO MEDIANTE ID(TOMADO DEL BODY) AL CARRTIO MEDIANTE SU ID
routerCart.post("/:id/products", async(req, res) => {
    const {id}= req.params;
    const {body} = req;

    const product = await products.getById(body.id)

    try {
        if(product){
            productAdded = await carrito.addToCartById(id, product);
    
            productAdded
            ? res.status(200).json({Success: "Product added"})
            : res.status(404).json({error: "there was a problem adding the product"})
    
        }else{
            res.status(404).json({error: "the product was not found"});
        }
    } catch (error) {
        console.log("error: " + error.message);
    }
    
});


//ELIMINAR UN PRODUCTO DEL CARRITO (ID) MEDIANTE EL ID DEL PRODUCTO


routerCart.delete("/:id/products/:id_prod", async(req, res) => {
    const {id} = req.params;
    const {id_prod} = req.params;

    try {
        const deleteProduct = await carrito.deleteProductFromCart(id, id_prod);

        deleteProduct
        ? res.status(200).json({Success: "Product succesfully deleted"})
        : res.status(404).json({error: "there was a problem deleting the product"})


    } catch (error) {
        console.log("error: " + error);
    }

    
    
    
});











module.exports = routerCart;