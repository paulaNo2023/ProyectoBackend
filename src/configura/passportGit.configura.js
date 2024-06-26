import passport from "passport";
import GitHubStrategy from "passport-github2"
import usersModel from "../dao/models/users.js";




const initializePassportGH = () => {
    passport.use(
        "github",

        new GitHubStrategy(

            {
                clientID: "Iv1.1ad8ab36274f660b",
                clientSecret: "820f7e8a0dcd6e3375f0ded8c719ecb176ebc1d9",
                callbackURL: "http://localhost:8080/api/sessions/githubcallback"

            },

            async (accessToken, refreshToken, profile, done) => {

                try {
                    let user = await usersModel.findOne({ email: profile._json.email });

                    if (!user) {

                        let newUser = {

                            first_name: profile._json.name,

                            last_name: "",

                            email: profile._json.email,

                            password: ""

                        };

                        let result = await usersModel.create(newUser);

                        done(null, result);

                    } else {

                        done(null, user);

                    }

                } catch (error) {

                    return done(error);

                }

            }

        )

    )

    passport.serializeUser((user, done) => {

        done(null, user._id);

    });




    passport.deserializeUser(async (id, done) => {

        const user = await usersModel.findById(id);

        done(null, user);

    });

};




export default initializePassportGH;