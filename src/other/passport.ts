import passport from "passport"
import * as passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import UserService from "../services/UserService"
import {helpers} from"./helpers"
import {User} from "../entities/User"



//busqueda de usuario
passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true



}, async (request, email, password, done) => {
  
  const userService = new UserService()
  const busqueda : User[]  = await userService.getDatabyEmail(email)
  if (busqueda.length == 1) {
    const user:User = busqueda[0];
    const validPassword = await helpers.matchPassword(password, user.password)
    if (validPassword) {
      request.flash("success_msg", "Bienvenido " , user.email)
      done(null, user);
    } else {
      request.flash("error_msg", "Contraseña incorrecta")
      done(null, false);
    }
  } else {
    request.flash("error_msg", "El usuario no existe.")
    return done(null, false);
  }
}));
// registro de Creacion de usuario

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (request, email, password, done) => {

  const {name,lastName, username, city, state, phone} = request.body;
  const newUser = {
    name,
    lastName,
    email,
    password,
    username,
    city,
    state,
    phone,
}

 newUser.password = await helpers.encryptPassword(password);


 const userService = new UserService()
 try {
     await userService.create(newUser).then((result) => {
       request.flash('message', 'Usuario creado con éxito');
         return done(null, result);
     });
 } catch (err) {
     request.flash(err.toString() )
     request.flash('message', err.toString());
     return done(null, null);
 }

}));

passport.serializeUser((user: User, done) => {
 
 done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
 const userService = new UserService()
 const result = await userService.getData(id)
 done(null, result);
})