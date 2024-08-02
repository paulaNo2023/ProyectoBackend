const adminPolicy = () => {
  return (req, res, next) => {
      if (!req.session.user) return res.status(401).send({ status: "error", error: "No autenticado" });
      if (req.session.user.role.toUpperCase() !== "ADMIN") return res.status(401).send({ status: "error", error: "No autorizado" });
      next();
  }
}

const superPolicy = () => {
  return (req, res, next) => {
      if (!req.session.user) return res.status(401).send({ status: "error", error: "No autenticado" });
      if (req.session.user.role.toUpperCase() !== "ADMIN" && req.session.user.role.toUpperCase() !== "PREMIUM") return res.status(401).send({ status: "error", error: "No autorizado" });
      next();
  }
}

const productPolicy = () => {
  return (req, res, next) => {
      if (req.session.user.role.toUpperCase() == "ADMIN") return res.status(401).send({ status: "error", error: "Eres administrados, no se puede agregar productos" });
      next();
  }
}

const policies = {
  adminPolicy,
  superPolicy,
  productPolicy,
}

export default policies;