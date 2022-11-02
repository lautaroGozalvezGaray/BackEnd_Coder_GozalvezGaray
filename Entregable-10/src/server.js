const express = require("express");
const routerProducts = require("./routers/products");
const routerCart = require("./routers/carrito");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.use("/api/products", routerProducts);

app.use("/api/carrito", routerCart);

app.all("*", (req, res) => {
    res.status(404).json({message: "Path not found"})
})








PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`listening Port at ${PORT}`);
})