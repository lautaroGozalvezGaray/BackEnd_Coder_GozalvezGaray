const moment = require("moment");

const CartDaoMongoDb = require("../../daos/cart/cartDaoMongoDb.js");
const ProductsDaoMongoDb = require("../../daos/products/productsDaoMongoDb");

const carrito = new CartDaoMongoDb();
const product = new ProductsDaoMongoDb();

const createNewCart = async(req, res) =>{
    try {
        const {body} = req;

        
        body.timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
        body.products = [];

        const newCart = await carrito.save(body);
        console.log(newCart);
        newCart
          ? res.status(200).json({success : "cart added with ID: "+ newCart._id})
          : res.json({mensaje: "There are no products"});

    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            success:false
        })
    }
}

const deleteCart = async(req, res) =>{
    try {

        const {id} = req.params;

        await carrito.deleteById(id);

        res.status(200).json({mensaje: `Cart whit ID : ${id} was deleted successfully`});

    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            success:false
        })
    }
}

const productsFromCart = async(req, res) =>{
    try {

        const {id} = req.params;
        const cart = await carrito.getById(id);
        
        cart 
          ? res.status(200).json({cart_number: id, "Products ": cart.products.length>0 ? cart.products : "There aren't products"})
           
          : res.status(404).json({error: `The Cart whit ID: ${id} was not found`});

    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            success:false
        })
    }
}

const addProductToCart = async(req, res) =>{
    try {

        const {id}= req.params;
        const {body} = req;

        const newProducts = await product.getById(body.id)
        console.log(newProducts);

        if(newProducts){
            let productAdded = await carrito.updateById(id, { products: newProducts })
            console.log(productAdded);
            productAdded
            ? res.status(200).json({Success: "Product added"})
            : res.status(404).json({error: "there was a problem adding the product"})
    
        }else{
            res.status(404).json({error: "the product was not found"});
        }

    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            success:false
        })
    }
}

const deleteProductFromCart = async(req, res) =>{
    try {
        const {id} = req.params;
        const {id_prod} = req.params;
        const deleteProduct = await carrito.deleteProductFromCart(id, id_prod);
        console.log(deleteProduct);
        deleteProduct
        ? res.status(200).json({Success: "Product succesfully deleted"})
        : res.status(404).json({error: "there was a problem deleting the product"})


    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            success:false
        })
    }
}





module.exports= {createNewCart, deleteCart, productsFromCart, addProductToCart, deleteProductFromCart}