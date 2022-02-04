import { Router } from "express";
import UserController from "../src/controllers/UserController"


const router = Router();

const userController = new UserController();

router.get("/", (request, response) => {
  response.render("login/signin")
}); 

router.get("/index", (request, response) => {
  response.render("index")
});

router.get("/addUser", (request, response) => {
  response.render("User/add");
});
router.get("/users", userController.list);

router.post("/add-user", userController.create);

router.get("/search", userController.search);

router.get("/editUser", userController.get);

router.post("/edit-user", userController.update);

router.post("/delete-user", userController.delete);

export { router };
