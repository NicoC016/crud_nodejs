const express = require('express');
const routerSign = express.Router();
import passport from "passport"
const {isLoggedIn} =  require("../src/other/authoricer")


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
  
routerSign.get('/logout', (request, response) => {
    request.logOut();
    response.redirect('/');
});
  
routerSign.get("/index", isLoggedIn, (request, response) => {
    request.render('index');
});
export {routerSign};