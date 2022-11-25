import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../repositories/ProductRepository";
import { Product } from "../entities/Product";
import { Category } from "../entities/Category";

interface IProduct{
  
    id: string;
    productname: string;
    price: number;
    type: "varchar";
    category: Category;
    
}

class ProductService {

    async create({ productname, price, type, category }) {
        if (!productname || !price || !type ||!category) {
          throw new Error("Por favor complete todo los campos");
        }

    const productRepository = getCustomRepository(ProductRepository);   
    
    const productnameAlreadyExists = await productRepository.findOne({ productname });

    if (productnameAlreadyExists) {
        throw new Error("El nombre del producto ya está registrado");
    }
    const newProduct = new Product()
   
    newProduct.productname = productname
    newProduct.price = price
    newProduct.type = type
    newProduct.category = category
    
    

    await productRepository.save(newProduct);

    return newProduct;

    }


    async delete(id: string) {
        const productRepository = getCustomRepository(ProductRepository);
    
        const product = await productRepository
            .createQueryBuilder()
            .delete()
            .from(Product)
            .where("id = :id", { id })
            .execute();

        return product;
    }


    async getData(id: string) {
        const productRepository = getCustomRepository(ProductRepository);
    
        const product = await productRepository.findOne(id);
    
        return product;
    }


    async list() {
        const productRepository = getCustomRepository(ProductRepository);
    
        const product = await productRepository.find({relations:["category"]});   
        return product;
    }


    async search(search: string) {
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }
    
        const productRepository = getCustomRepository(ProductRepository);
        const product = await productRepository
            .createQueryBuilder()
            .where("name like :search", { search: `%${search}%` })
            .orWhere("price like :search", { search: `%${search}%` })
            .orWhere("type like :search", { search: `%${search}%` })
            .orWhere("categoryId like :search", { search: `%${search}%` })
            .getMany();
    
        return product;
    }


    
    async update({ id, productname, price, type, category }: IProduct) {
        const productRepository = getCustomRepository(ProductRepository);

        const product = await productRepository
            .createQueryBuilder()
            .update(Product)
            .set({ productname, price, type, category})
            .where("id = :id", { id })
            .execute();

        return product;
    }
    
};

export const productService = new ProductService()
  