const express = require("express");
const Contenedor = require("./src/contenedor");
const contenedor = new Contenedor("products.json");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.set('views', './views');
app.set('view engine', 'pug');


app.get("/", (req, res) => {
    res.render("form", {});
})


app.post("/products", async(req, res) => {
    const {body} = req;

    await contenedor.save(body);

    res.redirect("/");
})

app.get("/products", async(req, res) => {
    const products = await contenedor.getAll();

    res.render("list", {products: products});
})









app.listen(8080, () => {
    console.log("listening Port at 8080");
})