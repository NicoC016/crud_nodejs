import { Router } from 'express';
import ProductController from "../src/controllers/ProductController";
import { Authoricer } from '../src/other/authoricer';

const productController = new ProductController();

const routerProduct = Router();


routerProduct.get("/addProduct",Authoricer.isLoggedIn,  productController.add);

routerProduct.get("/products",Authoricer.isLoggedIn, productController.list);

routerProduct.post("/add-product",Authoricer.isLoggedIn, productController.create);

routerProduct.get("/searchProduct", Authoricer.isLoggedIn,productController.search)

routerProduct.get("/editProduct", Authoricer.isLoggedIn,productController.get);

routerProduct.post("/edit-product",Authoricer.isLoggedIn, productController.update);

routerProduct.post("/delete-product",Authoricer.isLoggedIn, productController.delete);


export { routerProduct };




