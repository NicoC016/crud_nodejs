import { getCustomRepository } from "typeorm";
//repositorios
import { OrderRepository } from "../repositories/OrderReposytory";

//entidades
import { Order } from "../entities/Order";
import { Product } from "../entities/Product";

export interface IOrder {
    id: string;
    numeroDeOrden:number;
    cliente:string; 
    fecha:Date; 
    status:string; 
    productos:Product[]; 

}

class OrderService {
    async create({ numeroDeOrden ,cliente, fecha,status, productos }) {
        if ( !numeroDeOrden || !cliente || !fecha || !status || !productos) {
            throw new Error("Completar todos los datos")
        }
        const orderRepository = getCustomRepository(OrderRepository);

        const orderAlreadyExists = await orderRepository.findOne({ numeroDeOrden });

        if (orderAlreadyExists) {
            throw new Error("El pedido ya está registrado");
        }


        const newOrder = new Order();

        newOrder.numeroDeOrden = numeroDeOrden;
        newOrder.cliente = cliente;
        newOrder.fecha = fecha;
        newOrder.status = status;
        newOrder.productos=productos;

        orderRepository.save(newOrder);
        
        return newOrder;

    }


    async delete(id: string) {
        const orderRepository = getCustomRepository(OrderRepository);

        const order = await orderRepository
            .createQueryBuilder()
            .delete()
            .from(Order)
            .where("id = :id", { id })
            .execute();

        return order;
    }


    async getData(id: string) {
        
        const orderRepository = getCustomRepository(OrderRepository);

        const order = await orderRepository.findOne(id,{relations:["productos", "cliente"]});

        return order;
    }


    async list() {
        const orderRepository = getCustomRepository(OrderRepository);
        
        const orders = await orderRepository.find({relations:["productos","cliente"]});
        return orders;
    }


    async search(search: string) {
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }

        const orderRepository = getCustomRepository(OrderRepository);

        const order = await orderRepository
            .createQueryBuilder()
            .where("name like :search", { search: `%${search}%` })
            .getMany();

        return order;
    }



    async update({ id,numeroDeOrden,cliente, fecha, status, productos }: IOrder) {
        const orderRepository = getCustomRepository(OrderRepository);

        const order = await orderRepository
            .createQueryBuilder()
            .update(Order)
            .set({ numeroDeOrden, cliente, fecha, status })
            .where("id = :id", { id })
            .execute();

            const orders = await this.getData(id);
            orders.productos = productos
            await orderRepository.save(orders)
        return order;
    }

};

export const orderService = new OrderService()
