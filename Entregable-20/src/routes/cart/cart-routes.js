const express = require("express");
const { createNewCart, deleteCart, productsFromCart, addProductToCart, deleteProductFromCart, sendOrder } = require("../../controllers/cart/cart-controllers.js");

const routerCart = express.Router();

//CREAR UN CARRITO NUEVO

routerCart.post("/", createNewCart);

//ELIMINAR UN CARRITO

routerCart.delete("/:id", deleteCart)

//LISTAR TODOS LOS PRODUCTOS DEL CARRTIO SEGUN ID
routerCart.get("/:id/products", productsFromCart)

//AGREGAR UN PRODUCTO MEDIANTE ID(TOMADO DEL BODY) AL CARRTIO MEDIANTE SU ID
routerCart.post("/:id/products", addProductToCart);


//ELIMINAR UN PRODUCTO DEL CARRITO (ID) MEDIANTE EL ID DEL PRODUCTO


routerCart.delete("/:id/products/:id_prod", deleteProductFromCart);

//PARA CONFIRMAR LA ORDEN Y MANDAR EL EMAIL Y EL WAHTSAPP

routerCart.post("/:id/send-order", sendOrder);


module.exports = routerCart;