const express = require("express");
const hbs = require('express-handlebars')
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))


const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const Contenedor = require("./contenedor");
const contenedor = new Contenedor("../products.json");
const chat = new Contenedor("../chat.json")

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
    const productos = await contenedor.getAll();
    socket.emit('bienvenidoLista', productos )
    
    //emite los mensajes guardados
    const mensajes = await chat.getAll();
    socket.emit('listaMensajesBienvenida', mensajes)
    
    //escucha el nuevo mensaje, lo guarda y llama a listaMensajesActualizada enviandole los mensajes
    socket.on('nuevoMensaje', async(data) => {
        await chat.save(data);
        
        const mensajes = await chat.getAll();
        
        io.sockets.emit('listaMensajesActualizada', mensajes)
    })

    //escucha el nuevo producto, lo guarda y llama a listaActualizada enviandole los productos
    socket.on('productoAgregado', async(data) => {
        console.log('Alguien presionó el click')
        await contenedor.save(data);
        
        const productos = await contenedor.getAll();
        io.sockets.emit('listaActualizada', productos);
    })
    
    socket.on('disconnect', () => {
        console.log('Usuario desconectado')
    })
    
})

app.post("/products", async(req, res) => {
    const {body} = req;
    await contenedor.save(body);
    res.redirect("/")
})


app.get("/", (req, res) => {
    res.render("partials/form.hbs", {});
    
})








httpServer.listen(8080, () => {
    console.log("listening Port at 8080");
})