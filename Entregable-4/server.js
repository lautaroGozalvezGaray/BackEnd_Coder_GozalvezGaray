const express = require("express");
const products = require("./modulos/products")

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.use("/api/products", products);
app.use(express.static("./public"));










app.listen(8080, () => {
    console.log("listening Port at 8080");
})