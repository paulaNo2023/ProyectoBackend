import { CartsDTO } from "../DTO/carts.dto.js";

import { CartsDAO } from "../dao/dbManagers/carts.manager.js";




const cartsDAO = new CartsDAO();




export class CartsService {

    constructor (){

    }




    async getAll() {

        return await cartsDAO.getAll();

    }




    async getId(id) {

        return await cartsDAO.getId(id);

    }




    async create(cart) {

        return await cartsDAO.create();

    }




    async update(id, obj) {

        const cart = new CartsDTO(obj);

        return await cartsDAO.update(id, cart);

    }




    async delete (id) {

        return await cartsDAO.delete(id);

    }

}