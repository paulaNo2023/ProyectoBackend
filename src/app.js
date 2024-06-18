import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars'
import mongoose from 'mongoose';

import products from './routes/products.router.js';
import carts from './routes/carts.router.js';
import views from './routes/views.router.js';
import sessionRouter from './routes/session.router.js';
import MessagesManager from './dao/dbManagers/messages.js';


import __dirname from './utils.js';
import { Server } from 'socket.io'

const app = express();
const connection = mongoose.connect('mongodb+srv://paulasanabria97:Televisor1997@@cluster0.unlpvw8.mongodb.net/')

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://paulasanabria97:Televisor1997@@cluster0.unlpvw8.mongodb.net//?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: 'ecommerce',
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine() );
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use('/api/products', products);
app.use('/api/carts', carts);
app.use('/', views);
app.use('/api/sessions', sessionRouter);

const httpServer = app.listen(8080, () => console.log('El servidor inició en el puerto 8080'));

const io = new Server(httpServer);

const messages = [];
const messagesManager = new MessagesManager();

io.on('connection', socket => {
    console.log('Cliente conectado');
    socket.on('mensaje', data => {
        console.log(data);
        if (data.accion === 'guardarMensaje') {
                let message = {
                    user: data.user,
                    message: data.message
                }
                messagesManager.createMessage(message);
        }
    })
})
