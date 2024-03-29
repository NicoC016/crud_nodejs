import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
//routers
import { routerOrder } from "../routes/router-order";
import { router } from "../routes/routes-user";
import { routerSign } from "../routes/router-sign";
import { routerProduct } from "../routes/routes-product";
import { routerCategory } from "../routes/routes-category";



import session from "express-session";
import passport from "passport";
import "./database";
import morgan from "morgan";
import flash from 'connect-flash'
//inicializacion
const app = express();


// sesion
app.use(session({
  secret: 'faztmysqlnodesession',
  resave: false,
  saveUninitialized: false,
  cookie : {
    sameSite: true,
    secure: false,
    path: '/',
    httpOnly: true
  
  }
}));


app.use(flash())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//middlewares
app.use(morgan('dev')); 
app.use(passport.initialize());
app.use(passport.session());

require("./other/passport")

//global variant
app.use((request:Request, response, next) => {

  app.locals.success_msg = request.flash("success_msg")
  app.locals.error_msg = request.flash("error_msg")
  app.locals.user = request.user
  next()

});



//router
app.use(router);
app.use(routerProduct);
app.use(routerCategory);
app.use(routerSign);
app.use(routerOrder);



app.set('view engine', 'ejs');

//start of server
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});



app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.listen(3001, () => {
  console.log("Server is running at port 3001");
});
