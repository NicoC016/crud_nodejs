import express, { NextFunction, Request, Response }from "express";
import passport from "passport"
import { Authoricer } from "../src/other/authoricer";

// Validacion de identidad 
 const redirectLogin = (req, res,next) => {  
    if(req.user){
        res.redirect("/")

    }else{
        next()
    }
 }


const routerSign = express.Router();
// SIGNUP (registrarse)
routerSign.get('/signup', (request, response) => {
    response.render('login/signup');
});
  
routerSign.post('/signup', passport.authenticate('local.signup', {
    successRedirect: "/",
    failureRedirect: '/signup',
    failureFlash: true
}));

  
// SINGIN (iniciar sesion)
routerSign.get('/signin', (request, response) => {
    response.render('login/signin');
});
  
routerSign.post('/signin', (request, response, next) => {
    passport.authenticate('local.signin', {
      successRedirect: "/index",
      failureRedirect: '/',
      failureFlash: true
    })(request, response, next);
});
//salir de la sesión
routerSign.get('/logout', function (req, res,next) {
    req.session.destroy(function (err) {
        if (err) {
          return console.error(err);
        } else {
          return res.redirect('/');
        };
    })  
})
//perfil
routerSign.get("/profile", Authoricer.isLoggedIn, (request, response,next) =>{
    response.render("User/profile")
    next()
});
  
routerSign.get("/index", Authoricer.isLoggedIn, (request, response, next) => {
    response.render('/index');
    next()
});


export {routerSign};