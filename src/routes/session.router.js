import { Router } from 'express';
import usersModel from '../dao/models/users.js';

const router = Router();

router.post('/register', async (req, res) => {
    const user = req.body;
    const result = await usersModel.create(user);
    res.send(
        {
            status: 'success',
            payload: result
        }
    );
});

router.post('/login', async (req, res) => {
    const user = req.body;
    const result = await usersModel.findOne({ email: user.email, password: user.password });
    if (!result) {
        if (user.email === "adminCoder@coder.com" && user.password === "adminCod3r123") {
            req.session.user = {
                name: "Admin Coder",
                email: "adminCoder@coder.com",
                role: "admin"
            }
            res.status(200).send(
                {
                    status: 'success',
                    payload: 'Login successful'
                }
            );  
        }
        else {
            res.status(400).send(
                {
                    status: 'error',
                    payload: 'Invalid username or password'
                }
            );
        }
    } else {
        let userInfo = {
            name: result.first_name + ' ' + result.last_name,
            email: result.email,
            role: "usuario"
        };
        req.session.user = userInfo;
        res.status(200).send(
            {
                status: 'success',
                payload: 'Login successful'
            }
        );
    }
});

router.post('/logout', async (req, res) => {
    req.session.destroy();
    res.status(200).send(
        {
            status: 'success',
            payload: 'Logout successful'
        });

});

export default router;