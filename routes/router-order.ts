import { Router } from "express";
import OrderController from "../src/controllers/OrderController";
import { Authoricer } from "../src/other/authoricer";



const routerOrder = Router();

const orderController = new OrderController();


routerOrder.get("/orders", Authoricer.isLoggedIn, orderController.list);
routerOrder.get("/addOrder", Authoricer.isLoggedIn,  orderController.add);
routerOrder.post("/add-order", Authoricer.isLoggedIn, orderController.create);
routerOrder.get("/searchOrder", Authoricer.isLoggedIn, orderController.search);
routerOrder.get("/editOrder", Authoricer.isLoggedIn, orderController.get);
routerOrder.post("/edit-order", Authoricer.isLoggedIn, orderController.update);
routerOrder.post("/delete-order", Authoricer.isLoggedIn, orderController.delete);

export { routerOrder };
