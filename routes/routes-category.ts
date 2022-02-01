import { request, response, Router } from "express";
import CategoryController from "../src/controllers/CategoryController";

const routerCategory = Router();

const categoryController = new CategoryController();

routerCategory.get("/addCategory", (request, response) => {
    response.render("Category/add");
  });
  
routerCategory.get("/category", categoryController.list);

routerCategory.post("/add-category", categoryController.create);

routerCategory.get("/searchCategory", categoryController.search);

routerCategory.get("/editCategory", categoryController.get);

routerCategory.post("/edit-category", categoryController.update);

routerCategory.post("/delete-category", categoryController.delete);

export { routerCategory };
  