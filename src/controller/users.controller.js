import { UsersService } from '../services/users.service.js';

const usersService = new UsersService();

export class UsersController {
    constructor() {}

    getUsers = async (req, res) => {
        try {
            const users = await usersService.getAll();
            res.status(200).send({
                status: 'success',
                message: 'Se obtuvieron los usuarios',
                payload: users
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudieron obtener los usuarios',
                payload: error
            });
        }
    }

    getUser = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await usersService.getId(id)
            res.status(200).send({
                status: 'success',
                message: 'Se obtuvo el usuario',
                payload: user
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudo obtener el usuario',
                payload: error
            });
        }
    }

    updateUser = async (req, res) => {
        try {
            const { id } = req.params;
            const { first_name, last_name, email, age, role } = req.body;
            const user = { first_name, last_name, email, age, role };
            const result = await usersService.update(id, user);
            res.status(200).send({
                status: 'success',
                message: 'Se actualizó el usuario',
                payload: result
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudo actualizar el usuario',
                payload: error
            });
        }
    }

    deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await usersService.delete(id);
            res.status(200).send({
                status: 'success',
                message: 'Se eliminó el usuario',
                payload: result
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudo eliminar el usuario',
                payload: error
            });
        }
    }
}