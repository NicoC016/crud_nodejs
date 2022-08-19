import { getCustomRepository } from "typeorm";
import { CategoryRepository } from "../repositories/CategoryRepository"
import { Category } from "../entities/Category";

interface ICategory {
    id?: string;
    name: string;

}

class CategoryService {

    async create({ name }: ICategory) {
        if (!name) {
            throw new Error("nombre ya existe")
        }

        const categoryRepository = getCustomRepository(CategoryRepository);

        const nameAlreadyExists = await categoryRepository.findOne({ name });

        if (nameAlreadyExists) {
            throw new Error("La categoría ya está registrada");
        }


        const category = categoryRepository.create({ name });

        await categoryRepository.save(category);

        return category;

    }


    async delete(id: string) {
        const categoryRepository = getCustomRepository(CategoryRepository);

        const category = await categoryRepository
            .createQueryBuilder()
            .delete()
            .from(Category)
            .where("id = :id", { id })
            .execute();

        return category;
    }


    async getData(id: string) {
        const categoryRepository = getCustomRepository(CategoryRepository);

        const category = await categoryRepository.findOne(id);

        return category;
    }


    async list() {
        const categoryRepository = getCustomRepository(CategoryRepository);

        const categories = await categoryRepository.find();

        return categories;
    }


    async search(search: string) {
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }

        const categoryRepository = getCustomRepository(CategoryRepository);

        const category = await categoryRepository
            .createQueryBuilder()
            .where("name like :search", { search: `%${search}%` })
            .getMany();

        return category;
    }



    async update({ id, name }: ICategory) {
        const categoryRepository = getCustomRepository(CategoryRepository);

        const category = await categoryRepository
            .createQueryBuilder()
            .update(Category)
            .set({ name })
            .where("id = :id", { id })
            .execute();

        return category;
    }

};

export const categoryService = new CategoryService()
export default CategoryService;
