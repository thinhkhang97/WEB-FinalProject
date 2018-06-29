module.exports = (req, res, next) => {
    if (req.session.isAdmin === true && req.session.isLogged===true) {
        next();
    }
    else {
        res.redirect(`/login?retUrl=${req.originalUrl}`);
    }
}