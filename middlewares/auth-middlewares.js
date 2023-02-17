const isLoggedIn = (req, res, next) => {
  if (req.session.activeUser === undefined) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

const isOrganiser = (req, res, next) => {
  if (req.session.activeUser.role !== "organiser") {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

const isUser = (req, res, next) => {
  if (req.session.activeUser.role !== "user") {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

const updateLocals = (req, res, next) => {
  // Si el usuario esta loggeado, creamos una variable local (res.locals) para renderizar enlaces que solo se vean si ha hecho login
  if (req.session.activeUser === undefined) {
    res.locals.isUserActive = false;
  } else {
    res.locals.isUserActive = true;
  }
  next(); // Crea la variable loca y continua con las rutas
};

module.exports = {
  isLoggedIn,
  isOrganiser,
  isUser,
  updateLocals,
};
