import messagesModel from "../models/messages.model.js";
import { logger } from "../../utils/logger.js";

export class MessagesDAO {
    constructor () {

    }

    async getAll() {
        try{
            return await messagesModel.find().lean();
        } catch (er) {
            logger.warning('Error al obtener todos los mensajes', er);
        }
    }

    async create(obj) {
        try {
            return await messagesModel.create(obj) 
        } catch (er) {
            logger.warning('Error al crear el mensaje', er);
        }
    }

    async delete(id) {
        try {
            return await messagesModel.deleteOne({_id: id}) 
        } catch(er) {
            logger.warning('Error al eliminar el mensaje', er);
        }
    }

    async deleteAll() {
        try {
            return await messagesModel.deleteMany({});
        } catch(er) {
            logger.warning('Error al eliminar todos los mensajes', er);
        }
    }

}