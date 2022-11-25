import { Request, Response } from "express";
import {  orderService } from "../services/OrderService";
import { productService } from "../services/ProductService";
import { userService } from "../services/UserService";

class OrderController {

    async create(request: Request, response: Response) {
        const { numeroDeOrden, cliente, fecha, status, productos } = request.body;

        try {
            await orderService.create({
                numeroDeOrden, cliente, fecha, status, productos
            }).then(() => {
                request.flash("success_msg", "Orden agregada correctamente")
                response.redirect("./orders")
            });
        } catch (err) {
            request.flash("error_msg", "fallo al crear la orden")
            response.redirect("./addOrder")

        }

    }

    async delete(request: Request, response: Response) {
        const { id } = request.body;
        try {
            await orderService.delete(id).then(() => {
                request.flash("success_msg", "orden eliminada exitosamente");
                response.redirect("./orders")
            });
        } catch (err) {
            request.flash("error_msg", "fallo al eliminar la orden");
            response.redirect("./orders")
        }
    }


    async add(req: Request, res: Response) {
        const productos = await productService.list();
        const user = await userService.list()
        return res.render("Order/add", { productos, user })
    }

    async get(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();

        const order = await orderService.getData(id);
        const productos = await productService.list()
        const user = await userService.list();

        const productosOrder = order.productos.map(element => element.id)


        return response.render("Order/edit", {
            order: order,
            productos: productos,
            user: user,
            productosOrder
        });
    }

    async list(request: Request, response: Response) {

        const orders = await orderService.list();
        const productos = await productService.list()
        const user = await userService.list()

        return response.render("Order/order", {
            orders: orders,
            productos: productos,
            user: user
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
            request.flash("error_msg", "fallo al buscar la orden");
            response.redirect("./order")
        }
    }

    async update(request: Request, response: Response) {
        const { id, numeroDeOrden, cliente, fecha, status, productos } = request.body;

        try {
            await orderService.update({ id, numeroDeOrden, cliente, fecha, status, productos }).then(() => {
                request.flash("success_msg", "orden actualizada correctamente")
                response.redirect("./orders")
            });
        } catch (err) {
            request.flash("error_msg", "fallo al actualizar la orden");
            response.redirect("./editOrder")
        }
    }


}
export default OrderController;