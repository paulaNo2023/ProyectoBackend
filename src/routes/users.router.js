import { Router } from 'express';
import { UsersController } from '../controller/users.controller.js';

const router = Router();
const usersController = new UsersController();

router.route('/')
    .get(usersController.getUsers)
    .delete(usersController.deleteUser)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser)