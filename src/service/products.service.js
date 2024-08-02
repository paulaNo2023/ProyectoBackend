import { ProductsDAO } from '../dao/dbManagers/products.manager.js';
import { ProductsDTO } from '../DTO/products.dto.js';

const productsDAO = new ProductsDAO();

export class ProductsService {
    constructor (){
    }

    async getAll(limit, page, query, sort) {
        return await productsDAO.getAll(limit, page, query, sort);
    }

    async getId(id) {
        return await productsDAO.getId(id);
    }

    async create(obj) {
        const product = new ProductsDTO(obj);
        return await productsDAO.create(product);
    }

    async update(id, obj) {
        const product = new ProductsDTO(obj);
        return await productsDAO.update(id, product);
    }

    async delete (id) {
        return await productsDAO.delete(id);
    }
}