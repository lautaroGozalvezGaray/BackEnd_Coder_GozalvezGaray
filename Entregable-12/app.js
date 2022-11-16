const express = require("express");
const session = require("express-session");
const sessionRoutes = require("./src/routes/session/session-routes.js")
const cookieParser = require('cookie-parser')
const hbs = require('express-handlebars')
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
require("dotenv").config();

const Mongodb = require("./src/container/mongoDbContainer.js")
const modelProducts = require("./src/modules/modulesProducts")
const modelMessage = require("./src/modules/modulesMessage.js")

const MongoStore = require("connect-mongo");

const advanceOptions = {useNewUrlParser: true, useUnifiedTopology:true}

const app = express();
app.use(cookieParser(process.env.SECRET_KEY_COOKIES));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.set('views', './src/views');
app.set('view engine', 'hbs');

app.engine('hbs', hbs.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/src/views/layouts',
    partialsDir: __dirname + '/src/views/partials'
}))


app.use(session({
    store:MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions:advanceOptions
    }),
    secret: process.env.SECRET_KEY_SESSION,
    resave:true,
    saveUninitialized:true
}))

const products = new Mongodb(modelProducts);
const messages = new Mongodb(modelMessage);

io.on('connection', async(socket) => {
    console.log("Usuario conectado");
    //emite la lista que ya se encuentra en el archivo
    const productos = await products.getAll();
    socket.emit('bienvenidoLista', productos )
    //emite los mensajes guardados
    const mensajes = await messages.getAll();
    
    socket.emit('listaMensajesBienvenida', mensajes)
    //escucha el nuevo mensaje, lo guarda y llama a listaMensajesActualizada enviandole los mensajes
    socket.on('nuevoMensaje', async(data) => {
        await messages.save(data);
        
        const mensajes = await messages.getAll();
        
        io.sockets.emit('listaMensajesActualizada', mensajes)
    })

    socket.on('productoAgregado', async(data) => {
        console.log('Alguien presionó el click')
        await products.save(data);
        
        const productos = await products.getAll();
        io.sockets.emit('listaActualizada', productos);
    })
    
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    })
})

app.use("/session", sessionRoutes);

//exports.app = httpServer;
module.exports = httpServer;