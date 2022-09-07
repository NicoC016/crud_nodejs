import {Request, Response} from "express"

export class Authoricer{
    static isLoggedIn (request:Request, response:Response, next) {
        if (!request.isAuthenticated()) {
            return next();
        }
        return response.redirect('/profile');
    }
    static isNotLoggedIn (req:Request, res:Response, next): any{
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    }
}