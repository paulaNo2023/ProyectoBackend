import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import Handlebars from 'handlebars';

import products from './routes/products.router.js';
import carts from './routes/carts.router.js';
import views from './routes/views.router.js';
import sessions from './routes/session.router.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import initializePassportGH from './config/passportGH.config.js';
import initializePassportJWT from './config/passportJWT.config.js';
import config from './config/config.js';

import __dirname from './utils.js';
import { Server } from 'socket.io'

const PORT = config.port;
const mongoUrl = config.mongoUrl;
const sessionKey = config.sessionKey

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

Handlebars.registerHelper('multiply', function(v1,v2) {
    return v1* v2;
});

const app = express();
const connection = mongoose.connect(mongoUrl)

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: mongoUrl,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: sessionKey,
    resave: false,
    saveUninitialized: false
}));

initializePassport();
initializePassportGH();
initializePassportJWT();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine() );
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use('/api/products', products);
app.use('/api/carts', carts);
app.use('/', views);
app.use('/api/sessions', sessions);

const httpServer = app.listen(PORT, () => console.log('El servidor inició en el puerto ' + PORT));

const io = new Server(httpServer);

// const messagesController = new MessagesController();

// io.on('connection', socket => {
//     console.log('Cliente conectado');
//     socket.on('mensaje', data => {
//         console.log(data);
//         if (data.accion === 'guardarMensaje') {
//                 let message = {
//                     user: data.user,
//                     message: data.message
//                 }
//                 messagesController.createMessage(message);
//         }
//     })
// }
// )
