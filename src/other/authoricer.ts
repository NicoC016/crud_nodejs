module.exports = {
    isLoggedIn (req, res, next): any {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/profile');
    },
    isNotLoggedIn (req, res, next): any{
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    }
};