const express = require("express");
require("dotenv").config();
const session = require("express-session");
const sessionRoutes = require("./src/routes/session/session-routes.js")
const productRoutes = require("./src/routes/products/products-routes.js")
const cartRoutes = require("./src/routes/cart/cart-routes.js");
const infoRoutes = require("./src/routes/info/info-routes.js");
const infoAccountRoutes = require("./src/routes/infoAccount/infoAccount-routes");
const cookieParser = require('cookie-parser')
const hbs = require('express-handlebars')
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const passport = require('passport')
const { initPassport } = require('./src/middleware/passport')

const MongoStore = require("connect-mongo");
const initSocket = require("./src/utils/initSocket.js");

const advanceOptions = {useNewUrlParser: true, useUnifiedTopology:true}

const app = express();

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
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 60000
    },
    secret: process.env.SECRET_KEY_SESSION,
    resave:true,
    saveUninitialized:true
}))

initSocket(io);

initPassport()
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser(process.env.SECRET_KEY_COOKIES));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


app.use("/api/session", sessionRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carrito", cartRoutes);
app.use("/api/info", infoRoutes);
app.use("/api/info", infoAccountRoutes);

app.get("/", (req, res) => {
    res.redirect('/api/session/login')
})


//exports.app = httpServer;
module.exports = httpServer;