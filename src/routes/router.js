import { Router } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const SECRET_KEY = config.sessionKey;

export default class CustomRouter {
    constructor() {
        this.router = Router();
        this.init()
    }
    getRouter() {
        return this.router;
    }
    init() { }

    get(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.applyCallbacks(callbacks));
    }

    post(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.applyCallbacks(callbacks));
    }

    put(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.applyCallbacks(callbacks));
    }

    delete(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.applyCallbacks(callbacks));
    }

    handlePolicies = (policies) => {
        return (req, res, next) => {
            if (policies[0] === "PUBLIC") return next();
            const authHeaders = req.headers.authorization;
            if (!authHeaders)
                return res.status(401).send({
                    status: "error", error: "Unauthorized"
                });
            const token = authHeaders.split(" ")[1];
            const user = jwt.verify(token, SECRET_KEY);
            if(!policies.includes(user.role.toUpperCase()))
            return res.status(403).send({ status: "error", error: "Forbidden"});

            req.user = user;
            next();
        }
    }

    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
          try {
            await callback.apply(this, params);
          } catch (error) {
            params[1].status(500).send(error);
          }
        })}
}