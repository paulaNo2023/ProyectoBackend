import { MessagesService } from '../services/messages.service.js';

const messagesService = new MessagesService();

export class MessagesController {
    constructor() {}

    getMessages = async (req, res) => {
        try {
            const messages = await messagesService.getAll();
            res.status(200).send({
                status: 'success',
                message: 'Se obtuvieron los mensajes',
                payload: messages
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudieron obtener los mensajes',
                payload: error
            });
        }
    }

    createMessage = async (req, res) => {
        try {
            const { user, message } = req.body;
            if(!author || !text) return res.status(400).send({
                status: 'error',
                message: 'Faltan datos'
            });
            const messages = { user, message };
            const result = await messagesService.create(messages);
            res.status(201).send({
                status: 'success',
                message: 'Se creó el mensaje',
                payload: result
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudo crear el mensaje',
                payload: error
            });
        }
    }

    deleteMessage = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await messagesService.delete(id);
            res.status(200).send({
                status: 'success',
                message: 'Se eliminó el mensaje',
                payload: result
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudo eliminar el mensaje',
                payload: error
            });
        }
    }

    deleteMessages = async (req, res) => {
        try {
            const result = await messagesService.deleteAll();
            res.status(200).send({
                status: 'success',
                message: 'Se eliminaron los mensajes',
                payload: result
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudieron eliminar los mensajes',
                payload: error
            });
        }
    }
}