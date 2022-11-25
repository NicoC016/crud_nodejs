import { request, response, Router } from "express";
import CategoryController from "../src/controllers/CategoryController";
import { Authoricer } from "../src/other/authoricer";

const routerCategory = Router();

const categoryController = new CategoryController();

routerCategory.get("/addCategory", (request, response) => {
    response.render("Category/add");
  });
  
routerCategory.get("/category", Authoricer.isLoggedIn,categoryController.list);

routerCategory.post("/add-category",Authoricer.isLoggedIn, categoryController.create);

routerCategory.get("/searchCategory",Authoricer.isLoggedIn, categoryController.search);

routerCategory.get("/editCategory", Authoricer.isLoggedIn,categoryController.get);

routerCategory.post("/edit-category",Authoricer.isLoggedIn,  categoryController.update);

routerCategory.post("/delete-category",Authoricer.isLoggedIn, categoryController.delete);

export { routerCategory };
  