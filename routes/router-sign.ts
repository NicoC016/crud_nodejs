import express from "express";
import passport from "passport"
import { Authoricer } from "../src/other/authoricer";




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
  
routerSign.get('/logout', (request, response) => {
    request.logOut();
    response.redirect('/');
});
//perfil
routerSign.get("/profile", Authoricer.isNotLoggedIn,  (request, response,next) =>{
    response.render("User/profile")
    next()
});
  
routerSign.get("/index", Authoricer.isNotLoggedIn, (request, response) => {
    response.render('/');
});
export {routerSign};