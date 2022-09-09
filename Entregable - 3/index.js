const express = require("express");
const app = express();

const Contenedor = require("./contenedor");
const container = new Contenedor("./products.txt");

const PORT = 8080;

app.get('/products', async(req, res) => {
    const allProduct = await container.getAll();
    res.json(allProduct)
})

app.get('/productRandom', async(req, res) => {
    const allProduct = await container.getAll();
    const productRandom = await container.getById(Math.ceil(Math.random()*(allProduct.length)));
    res.json(productRandom)
})


app.listen(PORT, () => {console.log(`El servidor esta escuchando en el puerto ${PORT}`);})