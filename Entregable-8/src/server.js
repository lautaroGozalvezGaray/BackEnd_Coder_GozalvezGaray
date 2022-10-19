const express = require("express");
const hbs = require('express-handlebars')
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { mysql, sqlite } = require("./container/option");
const {creationTables} = require("./script/createTables");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const DataBase = require("./container/contenedorDB");
const mySqlKnex = new DataBase(mysql, "products"); //ex contenedor
const sqLiteKnex = new DataBase(sqlite, "chat") //ex chat

app.engine('hbs', hbs.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.set('views', './views');
app.set('view engine', 'hbs');

io.on('connection', async(socket) => {
    console.log("Usuario conectado");
    //emite la lista que ya se encuentra en el archivo
    const productos = await mySqlKnex.getAll();
    socket.emit('bienvenidoLista', productos )
    //emite los mensajes guardados
    const mensajes = await sqLiteKnex.getAll();
    socket.emit('listaMensajesBienvenida', mensajes)
    //escucha el nuevo mensaje, lo guarda y llama a listaMensajesActualizada enviandole los mensajes
    socket.on('nuevoMensaje', async(data) => {
        await sqLiteKnex.save(data);
        
        const mensajes = await sqLiteKnex.getAll();
        
        io.sockets.emit('listaMensajesActualizada', mensajes)
    })
    //escucha el nuevo producto, lo guarda y llama a listaActualizada enviandole los productos
    socket.on('productoAgregado', async(data) => {
        console.log('Alguien presionó el click')
        await mySqlKnex.save(data);
        
        const productos = await mySqlKnex.getAll();
        io.sockets.emit('listaActualizada', productos);
    })
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    })
})

app.post("/products", async(req, res) => {
    const {body} = req;
    await mySqlKnex.save(body);
    res.redirect("/")
})

app.get("/", (req, res) => {
    res.render("partials/form.hbs", {});
    
})

httpServer.listen(8080, () => {
    creationTables(); //se llama a la creacion de las tablas cuando se levanta el servidor en caso que no existan.
    console.log("listening Port at 8080");
})