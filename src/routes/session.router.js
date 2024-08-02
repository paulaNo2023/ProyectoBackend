import CustomRouter from './router.js';
import usersModel from '../dao/models/users.js';
import { createHash, isValidPassword } from '../utils.js';
import passport from 'passport';
import passportCall from '../utils/passportCall.utils.js'
import authorization from '../middlewares/authorization.middleware.js';
import { generateToken } from '../utils/jwt.utils.js';
import config from '../config/config.js';

const secretKey = config.sessionKey;

export default class SessionRouter extends CustomRouter {
    init() {
        this.post("/register", ["PUBLIC"], passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }), async (req, res) => {
            res.send({ status: "success", message: "User registered" });
        });

        this.post('/login', ["PUBLIC"], passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }), async (req, res) => {
            if (!req.user) return res.status(400).send({ status: "error", error: "Invalid credentials" });
            console.log(req.user);
            if (req.user.email === "adminCoder@coder.com") {
                req.session.user = {
                    name: "Admin Coder",
                    email: "adminCoder@coder.com",
                    role: "admin"
                }
            } else {
                req.session.user = {
                    name: req.user.first_name + ' ' + req.user.last_name,
                    email: req.user.email,
                    role: req.user.role
                }

            }
            let token = generateToken(req.user);
            res.cookie(secretKey, token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true
            })
            res.status(200).send(
                {
                    status: 'success',
                    payload: req.user
                }
            )
        });

        this.post('/logout', ["PUBLIC"], async (req, res) => {
            req.session.destroy();
            res.status(200).send(
                {
                    status: 'success',
                    payload: 'Logout successful'
                }
            )
        });

        this.get('/failregister', ["PUBLIC"], async (req, res) => {
            res.send({ error: "Registration failed" })
        });

        this.get('/faillogin', ["PUBLIC"], async (req, res) => {
            res.send({ error: "Login failed" })
        });

        this.get(
            "/github",
            ['PUBLIC'],
            passport.authenticate("github", { scope: ["user:email"] }),
            async (req, res) => { }
        );

        this.get("/githubcallback", ["PUBLIC"], passport.authenticate("github", { failureRedirect: '/' }), (req, res) => {
            req.session.user = {
                name: req.user.first_name + ' ' + req.user.last_name,
                email: req.user.email,
                role: "usuario"
            };
            res.redirect("/products");
        });

        this.get("/current", ["USER", "ADMIN"], passportCall('jwt'), async (req, res) => {
            res.send(req.session.user);
        })

    }


}