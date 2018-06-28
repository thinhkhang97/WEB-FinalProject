module.exports = (req, res, next) => {
    if (req.session.isLogged === undefined)
        req.session.isLogged = false;
    res.locals.layoutVM = {
        isLogged: req.session.isLogged,
        isAdmin: req.session.isAdmin
    }
    next();
}