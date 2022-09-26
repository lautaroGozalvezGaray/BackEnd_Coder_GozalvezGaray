const express = require("express");
const hbs = require('express-handlebars')
const Contenedor = require("./src/contenedor");
const contenedor = new Contenedor("products.json");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.engine('hbs', hbs.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.set('views', './views');
app.set('view engine', 'hbs');


app.post("/products", async(req, res) => {
    const {body} = req;
    await contenedor.save(body);
    res.redirect("/")
})

app.get("/products", async(req, res) => {
    products = await contenedor.getAll();
    res.render("partials/list", {products});
})


app.get("/", (req, res) => {
    res.render("partials/form.hbs");
})


app.post("/products", async(req, res) => {
    const {body} = req;

    await contenedor.save(body);

    res.redirect("/");
})









app.listen(8080, () => {
    console.log("listening Port at 8080");
})