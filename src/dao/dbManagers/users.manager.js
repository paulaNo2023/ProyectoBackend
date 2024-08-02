import usersModel from '../models/users.model.js';
import { logger } from "../../utils/logger.js";


export class UsersDAO {
    constructor() {}

    async getAll() {
        try {
        return await usersModel.find().lean();
        } catch (er) {
        logger.warning('Error al obtener todos los usuarios', er);
        }
    }

    async getId(id) {
        try {
        return await usersModel.findById(id).lean();
        } catch (er) {
        logger.warning('Error al obtener el usuario por ID', er);
        }
    }

    async update(id, obj) {
        try {
        return await usersModel.findByIdAndUpdate(
            {
            _id: id,
            },
            {
            $set: obj,
            }
        );
        } catch (er) {
        logger.warning('Error al actualizar el usuario', er);
        }
    }

    async delete(id) {
        try {
        return await usersModel.deleteOne({
            _id: id,
        });
        } catch(er) {
        logger.warning('Error al eliminar el usuario', er);
        }
    }
    }