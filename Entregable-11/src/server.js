const express = require("express");
const hbs = require('express-handlebars')
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const ProductMocker = require("./mock/poductMock");
const Container = require("./container/fileContainer.js");
const { normalize, schema } = require("normalizr");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const container = new Container("./container/DB/mensajeData.json");

const productMoker = new ProductMocker();


app.engine('hbs', hbs.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.set('views', './views');
app.set('view engine', 'hbs');

// Definimos un esquema de autor
const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });

// Definimos un esquema de mensaje
const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, { idAttribute: 'id' })

// Definimos un esquema de posts
const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })

const normalizarMensajes = (mensajesConId) => normalize(mensajesConId, schemaMensajes)


io.on('connection', async(socket) => {
    console.log("Usuario conectado");
    //emite la lista que ya se encuentra en el archivo
    const productos = await productMoker.generateRandomProducts();
    socket.emit('bienvenidoLista', productos )
    //emite los mensajes guardados
    const mensajes = await listarMensajesNormalizados();
    
    socket.emit('listaMensajesBienvenida', mensajes)
    //escucha el nuevo mensaje, lo guarda y llama a listaMensajesActualizada enviandole los mensajes
    socket.on('nuevoMensaje', async(data) => {
        await container.save(data);
        
        const mensajes = await listarMensajesNormalizados();
        
        io.sockets.emit('listaMensajesActualizada', mensajes)
    })
    
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    })
})

async function listarMensajesNormalizados() {
    const mensajes = await container.getAll()
    const normalizados = normalizarMensajes({ id: 'mensajes', mensajes })
    return normalizados
}


app.get("/", (req, res) => {
    res.render("partials/form.hbs", {});
    
})

httpServer.listen(8080, () => {
    console.log("listening Port at 8080");
})