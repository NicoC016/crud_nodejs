import { Request, Response } from "express";
import OrderService, { orderService } from "../services/OrderService";
import ProductService, { productService } from "../services/ProductService";

class OrderController {

    async create(request: Request, response: Response) {
        const {numeroDeOrden,cliente, fecha,status, productos } = request.body;

    
        try {
            await orderService.create({
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

    async add (req: Request, res: Response){

        const productos = await productService.list();
        return res.render("Order/add", {productos})
    }

    async delete(request: Request, response: Response) {
        const { id } = request.body;
  
        try {
            await orderService.delete(id).then(() => {
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


        const order = await orderService.getData(id);

        const productos = await productService.list()

        return response.render("Order/edit", {
        order: order,
        product: productos
        });
    }

    async list(request: Request, response: Response) {
        const listOrderService = new OrderService();
        const orders = await listOrderService.list();

        const productList = new ProductService();

        const productos = await productList.list() 

        return response.render("Order/order", {
        orders: orders,
        product: productos
        });
    }

    async search(request: Request, response: Response) {
         let { search } = request.query;
         search = search.toString();  
        try {
            const orders = await orderService.search(search);
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
    

  
        try {
            await orderService.update({ id, numeroDeOrden,cliente, fecha,status, productos }).then(() => {
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