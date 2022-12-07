const express = require("express");
const { productsGet, productsGetById, addProducts, deleteProducts, updateProducts } = require("../../controllers/products/products-controllers.js");


const routerProducts = express.Router();


//TRAER TODOS LOS PRODUCTOS

routerProducts.get("/", productsGet);

//TRAER UN PRODUCTO MEDIANTE ID
routerProducts.get("/:id", productsGetById);


//AGREGAR UN PRODUCTO
routerProducts.post("/", addProducts);

//ELIMINAR UN PRODUCTO
routerProducts.delete("/:id", deleteProducts)

//MODIFICAR UN PRODUCTO
routerProducts.put("/:id", updateProducts);

module.exports=routerProducts;
