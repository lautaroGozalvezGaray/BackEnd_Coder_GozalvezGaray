//variable admin
const isAdmin = true;

const ProductsDaoMongoDb = require("../../daos/products/productsDaoMongoDb.js");

const contenedor = new ProductsDaoMongoDb();

const productsGet = async(req, res) =>{
    try {
        const product = await contenedor.getAll();
        
        product.length != 0 
          ? res.status(200).json(product)
          : res.json({mensaje: "There are no products"});
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            success:false
        })
    }
}

const productsGetById = async(req, res) =>{
    try {
        const product = await contenedor.getById(req.params.id);
        product 
          ? res.status(200).json(product)
          : res.status(404).json({error: `The product whit ID: ${id} was not found`});

    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            success:false
        })
    }
}

const addProducts = async(req, res) =>{
    try {
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

    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            success:false
        })
    }
}

const deleteProducts = async(req, res) =>{
    try {
        
        if(isAdmin == true){
            const {id} = req.params;
            const product = await contenedor.deleteById(id);
    
            if(product != ""){
                res.status(200).json({mensaje: `Product whit ID : ${id} was deleted successfully`});
            }
            
        }else{
            res.status(404).json({ error : -1, description: "ruta: /api/id" +", " +"method: "+ req.method +" "+  "no autorizada", message: "debe logearse como admin"});
    
        }

    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            success:false
        })
    }
}


const updateProducts = async(req, res) =>{
    try {
        
        if(isAdmin == true){
            const {id} = req.params;
            const {body} = req;

            await contenedor.updateById(id, body);
            res.status(200).json({message: `Product whit ID : ${id} was modified successfully`});

        }else{
            res.status(404).json({ error : -1, description: "ruta: /api/id" +", " +"method: "+ req.method +" "+  "no autorizada", message: "debe logearse como admin"});
        }
    

    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            success:false
        })
    }
}


module.exports = {productsGet, productsGetById, addProducts, deleteProducts, updateProducts}