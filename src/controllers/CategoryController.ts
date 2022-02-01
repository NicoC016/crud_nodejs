import { Request, Response } from "express";
import CategoryService from "../services/CategoryService";


class CategoryController {

    async create(request: Request, response: Response) {
        const { name } = request.body;
    
        const createCategoryService = new CategoryService();
    
        try {
            await createCategoryService.create({
            name
            }).then(() => {
            response.render("Category/message", {
                message: "Categoría creada exitosamente"
            });
            });
        } catch (err) {
            response.render("Category/message", {
            message: `Error al crear categoría: ${err.message}`
            });
        }
  
    }

    async delete(request: Request, response: Response) {
        const { id } = request.body;
  
        const deleteCategoryService = new CategoryService();
  
        try {
            await deleteCategoryService.delete(id).then(() => {
                response.render("Category/message", {
                message: "Categoría eliminado exitosamente"
                });
            });
        } catch (err) {
            response.render("Product/message", {
                message: `Error al eliminar categoría: ${err.message}`
            });
        }
    }

    async get(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();

        const getCategoryDataService = new CategoryService();

        const category = await getCategoryDataService.getData(id);

        return response.render("Category/edit", {
        category: category
        });
    }

    async list(request: Request, response: Response) {
        const listCategoryService = new CategoryService();

        const categories = await listCategoryService.list();

        return response.render("Category/category", {
        categories: categories
        });
    }

    async search(request: Request, response: Response) {
         let { search } = request.query;
         search = search.toString();
  
        const searchCategoryService = new CategoryService();
  
        try {
            const categories = await searchCategoryService.search(search);
            response.render("Category/search", {
                categories: categories,
                search: search
            });
        } catch (err) {
            response.render("Category/message", {
                message: `Error al buscar categoría: ${err.message}`
            });
        }
    }

    async update(request: Request, response: Response) {
        const { id, name } = request.body;
    
        const updateCategoryService = new CategoryService();
  
        try {
            await updateCategoryService.update({ id, name }).then(() => {
                response.render("Category/message", {
                    message: "Categoría actualizado exitosamente"
                });
            });
        } catch (err) {
            response.render("Category/message", {
            message: `Error al actualizar categoría: ${err.message}`
            });
        }  
    }
}

export default CategoryController;