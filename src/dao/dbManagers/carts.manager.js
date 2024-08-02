import cartsModel from "../models/carts.model.js";
import { logger } from "../../utils/logger.js";

export class CartsDAO {

    constructor() {}

    async getAll() {
        try {
            return await cartsModel.find().lean();
        } catch (er) {
            logger.warning('Error al obtener todos los carritos', er);
        }
    }

    async getId(id) {
        try {
            return await cartsModel.findOne({_id: id}).lean();            
        } catch (er) {
            logger.warning('Error al obtener el carrito por ID', er);
        }
    }

    async create(obj) {
        try {
            return await cartsModel.create(obj);
        } catch (err) {
            logger.warning('Error al crear el carrito', err);
        }
    }

    async update(id, obj) {
        try {
            return await cartsModel.findOneAndUpdate({_id: id}, {$set: obj})
        } catch (err) {
            logger.warning('Error al actualizar el carrito', err);
        }
    }

    async delete(id) {
        try {
            return await cartsModel.findOneAndDelete({_id: id})
        } catch (err) {
            logger.warning('Error al eliminar el carrito', err);
        }
    }

}