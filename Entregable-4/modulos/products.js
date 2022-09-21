const express = require("express");
const Contenedor = require("../src/contenedor");
const contenedor = new Contenedor("products.json");

const router = express.Router();


router.get("/", async(req, res) => {
    
    try {
        const product = await contenedor.getAll();
        

        product.length != 0 
          ? res.status(200).json(product)
          : res.json({mensaje: "There are no products"});
          

    } catch (err) {
        console.log("erorr: " + err.message);
    }
    
})

router.get("/:id", async(req, res) => {
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

router.post("/", async(req, res) => {
    const productBody = req.body;

    try {
        await contenedor.save(productBody);
        res.status(200).json({mensaje: "New product added successfully", productBody});
        
    } catch (err) {
        res.status(404).json({error: `There was a problem adding the product`});
        console.log("erorr: " + err.message);
    }
    
})

router.delete("/:id", async(req, res) => {

    const {id} = req.params;

    try {
        await contenedor.deleteById(id);

        res.status(200).json({mensaje: `Product whit ID : ${id} was deleted successfully`});
        
    } catch (err) {
        console.log("erorr: " + err.message);
    }

})

router.put("/:id", async(req, res) => {
    const {id} = req.params;
    const {body} = req;

    try {

        await contenedor.updateById(id, body);
        res.status(200).json({error: `Product whit ID : ${id} was modified successfully`});

    } catch (error) {
        console.log("erorr: " + err.message);
    }

})












module.exports = router;