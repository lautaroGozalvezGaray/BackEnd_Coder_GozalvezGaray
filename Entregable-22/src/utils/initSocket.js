const ProductsDaoMongoDb = require("../data_Persistence/daos/products/productsDaoMongoDb")
const MessageDaoMongoDb = require("../data_Persistence/daos/messages/messagesDaoMongoDb.js");


const products = new ProductsDaoMongoDb();
const messages = new MessageDaoMongoDb();

const initSocket = (io) =>{
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
            await messages.save(data)
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
}

module.exports = initSocket