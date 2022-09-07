import { Request, Response } from "express";
import CategoryService from "../services/CategoryService";
import OrderService from "../services/OrderService";

class OrderController {

    async create(request: Request, response: Response) {
        const {numeroDeOrden,cliente, fecha,status, productos } = request.body;

        const createOrderService = new OrderService();
    
        try {
            await createOrderService.create({
            numeroDeOrden, cliente, fecha, status, productos
            }).then(() => {
                request.flash("success_msg", "categoria agregada correctamente")
                response.redirect("./order")
            });
        } catch (err) {
            request.flash("error_msg", "fallo al crear la categoria")
            response.redirect("./addOrder")
            
        }
  
    }

    async delete(request: Request, response: Response) {
        const { id } = request.body;
  
        const deleteOrderService = new OrderService();
  
        try {
            await deleteOrderService.delete(id).then(() => {
                request.flash("success_msg","categoria eliminada exitosamente");
                response.redirect("./order")
            });
        } catch (err) {
            request.flash("error_msg","fallo al eliminar la categoria");
            response.redirect("./order")
        }
    }

    async get(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();

        const getOrderDataService = new OrderService();

        const order = await getOrderDataService.getData(id);

        return response.render("Order/edit", {
        order: order
        });
    }

    async list(request: Request, response: Response) {
        const listOrderService = new OrderService();

        const orders = await listOrderService.list();

        return response.render("Order/order", {
        orders: orders
        });
    }

    async search(request: Request, response: Response) {
         let { search } = request.query;
         search = search.toString();
  
        const searchOrderService = new OrderService();
  
        try {
            const orders = await searchOrderService.search(search);
            response.render("Order/search", {
                orders: orders,
                search: search
            });
        } catch (err) {
            request.flash("error_msg","fallo al buscar la categoria");
            response.redirect("./order")
        }
    }

    async update(request: Request, response: Response) {
        const { id,numeroDeOrden,cliente, fecha,status, productos } = request.body;
    
        const updateCategoryService = new OrderService();
  
        try {
            await updateCategoryService.update({ id, numeroDeOrden,cliente, fecha,status, productos }).then(() => {
                request.flash("success_msg","categoria actualizada correctamente")
                response.redirect("./order")
            });
        } catch (err) {
            request.flash("error_msg", "fallo al actualizar la categoria");
            response.redirect("./editOrder")
        }  
    }
}
export default OrderController;