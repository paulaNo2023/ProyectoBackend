import { MessagesDAO } from '../dao/messages.dao.js';

import { MessagesDTO } from '../DTO/messages.dto.js';




const messagesDAO = new MessagesDAO();




export class MessagesService {

    constructor (){

    }




    async getAll() {

        return await messagesDAO.getAll();

    }




    async create(obj) {

        const message = new MessagesDTO(obj);

        return await messagesDAO.create(message);

    }




    async update(id, obj) {

        const message = new MessagesDTO(obj);

        return await messagesDAO.update(id, message);

    }




    async delete (id) {

        return await messagesDAO.delete(id);

    }




    async deleteAll() {

        return await messagesDAO.deleteAll();

    }

}