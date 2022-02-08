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
  const busqueda : User[]  = await userService.getDatabyUsername(email)
  if (busqueda.length == 1) {
    const user:User = busqueda[0];
    const validPassword = await helpers.matchPassword(password, user.password)
    if (validPassword) {
      done(null, user, console.log('success', 'bienvenido ' + user.email));
    } else {
      done(null, false, console.log('message', 'contraseña incorrecta'));
    }
  } else {
    return done(null, false, console.log('message', 'El usuario no existe.'));
  }
}));
// registro de Creacion de usuario

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (resquest, email, password, done) => {

  const { username, city, state, phone} = resquest.body;
  const newUser = {
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
         console.log('message', 'Usuario creado con éxito');
         return done(null, result);
     });
 } catch (err) {
     console.log(err.toString() )
     console.log('message', err.toString());
     return done(null, null);
 }

}));

passport.serializeUser((usr: User, done) => {
 
 done(null, usr.id);
});

passport.deserializeUser(async (id: string, done) => {
 const userService = new UserService()
 const result = await userService.getData(id)
 done(null, result);
})