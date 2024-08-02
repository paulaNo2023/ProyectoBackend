import jwt from "jsonwebtoken";
import config from "../config/config.js";

const SECRET_KEY = config.sessionKey;

export function generateToken(user) {
  const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: "300s" });

  return token;
}

export function authToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Not authenticated" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (error, credentials) => {
    if (error) return res.status(403).json({ error: "Not authorized" });

    req.user = credentials.user;

    next();
  });
}

export function authTokenCookies(req, res, next) {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  jwt.verify(token, SECRET_KEY, (error, credentials) => {
    if (error) return res.status(403).json({ error: "Not authorized" });

    req.user = credentials.user;

    next();
  });
}