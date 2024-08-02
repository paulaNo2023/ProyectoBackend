import passport from "passport";
import { Strategy, ExtractJwt as _ExtractJwt } from "passport-jwt";
import config from "./config.js";

const JWTStrategy = Strategy;
const ExtractJwt = _ExtractJwt;
const sessionKey = config.sessionKey;

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: sessionKey,
      },
      async (jwt_payload, done) => {
        try {
          done(null, jwt_payload);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies[sessionKey];
  }
  return token;
};

export default initializePassport;