import { getCustomRepository } from "typeorm";
import { CategoryRepository } from "../repositories/CategoryRepository"
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import { User } from "../entities/User";
import { OrderRepository } from "../repositories/OrderReposytory";
import { Order } from "../entities/Order";

interface IOrder {
    id?: string;
    numeroDeOrden:number;
    cliente:User; 
    fecha:Date
    status:string; 
    productos:Product[] 

}

class OrderService {

    async create({ numeroDeOrden,cliente, fecha,status, productos }: IOrder) {
        if ( !numeroDeOrden || !cliente || !fecha || !status || !productos) {
            throw new Error("nombre ya existe")
        }

        const orderRepository = getCustomRepository(OrderRepository);

        const orderAlreadyExists = await orderRepository.findOne({ numeroDeOrden });

        if (orderAlreadyExists) {
            throw new Error("El pedido ya está registrado");
        }


        const order = orderRepository.create({ numeroDeOrden });

        await orderRepository.save(order);

        return order;

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

        const order = await orderRepository.findOne(id);

        return order;
    }


    async list() {
        const orderRepository = getCustomRepository(OrderRepository);

        const orders = await orderRepository.find();

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
            .set({ numeroDeOrden, cliente, fecha, status, productos })
            .where("id = :id", { id })
            .execute();

        return order;
    }

};

export const orderService = new OrderService()
export default OrderService;
