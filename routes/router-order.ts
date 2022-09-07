import { Router } from "express";
import OrderController from "../src/controllers/OrderController";



const routerOrder = Router();

const orderController = new OrderController();


routerOrder.get("/addOrder", (request, response) => {
  response.render("Order/add");
});

routerOrder.get("/orders", orderController.list);

routerOrder.post("/add-order", orderController.create);

routerOrder.get("/search", orderController.search);

routerOrder.get("/editOrder", orderController.get);

routerOrder.post("/edit-order", orderController.update);

routerOrder.post("/delete-order", orderController.delete);

export { routerOrder };
