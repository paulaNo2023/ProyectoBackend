import ticketsModel from "../models/tickets.model.js";
import { logger } from "../../utils/logger.js";
import { log } from "winston";

export class TicketsDAO {
    constructor() {

    }

    async getAll() {
        try{
            return await ticketsModel.find().lean();
        } catch (er) {
            logger.warning('Error al obtener todos los tickets', er);
        }
    }

    async getId(id) {
        try{
            return await ticketsModel.findById(id).lean();
        } catch (er) {
            logger.warning('Error al obtener el ticket por ID', er);
        }
    }

    async create(obj) {
        try {
            return await ticketsModel.create(obj) 
        } catch(er) {
            logger.warning('Error al crear el ticket', er);
        }
    }

    async update(id, obj) {
        try {
            return await ticketsModel.findByIdAndUpdate({_id: id}, {$set: obj}) 
        } catch (er) {
            logger.warning('Error al actualizar el ticket', er);
        }
    }

    async delete(id) {
        try {
            return await ticketsModel.deleteOne({_id: id}) 
        } catch (er) {
            logger.warning('Error al eliminar el ticket', er);

        }
    }
}