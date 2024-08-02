import dotenv, { config } from 'dotenv';

const environment = "DEVELOPMENT";

dotenv.config({
    path:
        environment == "DEVELOPMENT" ? "./.env.development" : "./.env.production"
});

export default {
    port: process.env.PORT,
    mongoUrl: process.env.URL_MONGO,
    sessionKey: process.env.KEY_SESSION
}