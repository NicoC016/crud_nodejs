module.exports = {
    isLoggedIn (request, response, next): any {
        if (request.isAuthenticated()) {
            return next();
        }
        return response.redirect('/signin');
    },
    isNotLoggedIn (req, res, next): any{
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/profile');
    }
};