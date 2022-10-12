const express = require("express");
const Contenedor = require("../container/contenedorProducts");
const contenedor = new Contenedor("../src/container/data/products.json");

const routerProducts = express.Router();

//variable admin
const isAdmin = true;


routerProducts.get("/", async(req, res) => {
    
    try {
        const product = await contenedor.getAll();
        

        product.length != 0 
          ? res.status(200).json(product)
          : res.json({mensaje: "There are no products"});
          

    } catch (err) {
        console.log("erorr: " + err.message);
    }
    
})

routerProducts.get("/:id", async(req, res) => {
    const {id} = req.params;
    try {
        const product = await contenedor.getById(id);
        product 
          ? res.status(200).json(product)
          : res.status(404).json({error: `The product whit ID: ${id} was not found`});
        
        
    } catch (err) {
        console.log("erorr: " + err.message);
    }
    
})

routerProducts.post("/", async(req, res) => {
    if(isAdmin == true){
        const productBody = req.body;

        try {
            await contenedor.save(productBody);
            res.status(200).json({mensaje: "New product added successfully", productBody});
            
        } catch (err) {
            res.status(404).json({error: `There was a problem adding the product`});
            console.log("erorr: " + err.message);
        }
    }else{
        res.status(404).json({ error : -1, description: "ruta: /api/products" +", " +"method: "+ req.method +" "+  "no autorizada", message: "debe logearse como admin"});
    }
    
})

routerProducts.delete("/:id", async(req, res) => {

    if(isAdmin == true){
        const {id} = req.params;

        try {
            await contenedor.deleteById(id);

            res.status(200).json({mensaje: `Product whit ID : ${id} was deleted successfully`});
            
        } catch (err) {
            console.log("erorr: " + err.message);
        }
    }else{
        res.status(404).json({ error : -1, description: "ruta: /api/id" +", " +"method: "+ req.method +" "+  "no autorizada", message: "debe logearse como admin"});

    }
    

})

routerProducts.put("/:id", async(req, res) => {
    if(isAdmin == true){
        const {id} = req.params;
        const {body} = req;

        try {

            await contenedor.updateById(id, body);
            res.status(200).json({error: `Product whit ID : ${id} was modified successfully`});

        } catch (error) {
            console.log("erorr: " + err.message);
        }
    }else{
        res.status(404).json({ error : -1, description: "ruta: /api/id" +", " +"method: "+ req.method +" "+  "no autorizada", message: "debe logearse como admin"});
    }

})












module.exports = routerProducts;