import {User} from "../entities/User"
export class Authoricer{
    static isLoggedIn (request, response, next): any {
        if (request.isAuthenticated(User)) {
            return next();
        }
        return response.redirect('/profile');
    }
    static isNotLoggedIn (req, res, next): any{
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    }
};