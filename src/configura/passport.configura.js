import passport from "passport";
import local from "passport-local";
import usersModel from "../dao/models/users.js";
import { createHash, isValidPassword } from "../utils.js";
import CartManager from '../dao/fileManagers/CartManager.js';



const LocalStrategy = local.Strategy;
const cartManager = new CartManager();

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true, usernameField: 'email'
    }, async (req, email, password, done) => {
        const { first_name, last_name, age } = req.body;
        try {
          let user = await usersModel.findOne({ email: email });
          let newCart = await cartManager.createCart();


            if (user) {

                return done(null, false, { message: 'User already exists' });

            }

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password), 
                cart: newCart._id

            }

            let result = await usersModel.create(newUser)

            return done(null, result)

        } catch (err) {

            return done("Error de usuario" + err)

        }

    }

    ))




    passport.use("login", new LocalStrategy(
        { usernameField: "email" }, async (email, password, done) => {
         try {
                const user = await usersModel.findOne({ email: email });
                const adminUser = {
                    _id: 1,
                    name: "Coder",
                    email: "Coder@coder.com",
                    role: "admin"

                }

                if (!user && email == ! "Coder@coder.com" && password == ! "adminCod3r123") {

                    done(null, false)

                }

                if (email === "Coder@coder.com", password === "adminCod3r123") {

                    return done(null, adminUser)

                }

                if (!isValidPassword(user.password, password)) return done(null, false)

                done(null, user)

            } catch (err) {

                return done(err)

            }




        }

    ))




    passport.serializeUser((user, done) => {
        done(null, user._id)

    })




    passport.deserializeUser(async (id, done) => {

        const user = usersModel.findById(id)

        done(null, user)

    })

}




export default initializePassport