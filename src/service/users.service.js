import {UsersDAO} from '../dao/users.dao.js';
import {UsersDTO} from '../DTO/users.dto.js';

const usersDAO = new UsersDAO();

export class UsersService {
    constructor (){
    }

    async getAll() {
        return await usersDAO.getAll();
    }

    async getId(id) {
        return await usersDAO.getId(id);
    }

    async update(id, obj) {
        const user = new UsersDTO(obj);
        return await usersDAO.update(id, user);
    }

    async create(obj) {
        const user = new UsersDTO(obj);
        return await usersDAO.create(user);
    }

    async delete (id) {
        return await usersDAO.delete(id);
    }

}