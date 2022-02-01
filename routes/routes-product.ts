import { Router } from 'express';
import ProductController from "../src/controllers/ProductController";

const productController = new ProductController();

const routerProduct = Router();


routerProduct.get("/addProduct",  productController.add);

routerProduct.get("/products", productController.list);

routerProduct.post("/add-product", productController.create);

routerProduct.get("/searchProduct", productController.search)

routerProduct.get("/editProduct", productController.get);

routerProduct.post("/edit-product", productController.update);

routerProduct.post("/delete-product", productController.delete);


export { routerProduct };




