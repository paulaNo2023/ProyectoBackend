import productsModel from "../models/products.model.js";
import { logger } from "../../utils/logger.js";

export class ProductsDAO {

    constructor() {

    }

    async getAll(limit, page, query, sort) {
        try {
            return await productsModel.paginate(query, { limit: limit, page: page, sort: sort, lean: true });
        } catch (er) {
            logger.warning('Error al obtener todos los productos', er);
        }
    }

    async getId(id) {
        try {
            return await productsModel.findById({_id: id}).lean();
        } catch (er) {
            logger.warning('Error al obtener el producto por ID', er);
        }
    }

    async create(obj) {
        try {
            return await productsModel.create(obj)
        } catch(er) {
            logger.warning('Error al crear el producto', er);
        }
    }

    async update(id, obj) {
        try {
            return await productsModel.findByIdAndUpdate({ _id: id }, { $set: obj })
        } catch(er) {
            logger.warning('Error al actualizar el producto', er);
        }
    }

    async delete(id) {
        try {
            return await productsModel.deleteOne({ _id: id })
        } catch(er) {
            logger.warning('Error al eliminar el producto', er);
        }
    }

}