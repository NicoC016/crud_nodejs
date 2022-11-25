import { Router } from "express";
import UserController from "../src/controllers/UserController"
import { Authoricer } from "../src/other/authoricer";


const router = Router();

const userController = new UserController();

router.get("/", (request, response) => {
  response.render("login/signin")
}); 

router.get("/index", (request, response) => {
  Authoricer.isLoggedIn
  response.render("index")
});

router.get("/addUser", (request, response) => {
  Authoricer.isLoggedIn
  response.render("User/add");
});

router.get("/users", Authoricer.isLoggedIn,userController.list);

router.post("/add-user",Authoricer.isLoggedIn, userController.create);

router.get("/search",Authoricer.isLoggedIn, userController.search);

router.get("/editUser",Authoricer.isLoggedIn, userController.get);

router.post("/edit-user",Authoricer.isLoggedIn, userController.update);

router.post("/delete-user",Authoricer.isLoggedIn, userController.delete);

export { router };
