import { Request, Response } from "express";
import CategoryService from "../services/CategoryService";
import flash from"connect-flash";


class CategoryController {

    async create(request: Request, response: Response) {
        const { name } = request.body;
    
        const createCategoryService = new CategoryService();
    
        try {
            await createCategoryService.create({
            name
            }).then(() => {
                request.flash("success_msg", "categoria agregada correctamente")
                response.redirect("./category")
            });
        } catch (err) {
            request.flash("error_msg", "fallo al crear la categoria")
            response.redirect("./addCategory")
            
        }
  
    }

    async delete(request: Request, response: Response) {
        const { id } = request.body;
  
        const deleteCategoryService = new CategoryService();
  
        try {
            await deleteCategoryService.delete(id).then(() => {
                request.flash("success_msg","categoria eliminada exitosamente");
                response.redirect("./category")
            });
        } catch (err) {
            request.flash("error_msg","fallo al eliminar la categoria");
            response.redirect("./category")
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
            request.flash("error_msg","fallo al buscar la categoria");
            response.redirect("./category")
        }
    }

    async update(request: Request, response: Response) {
        const { id, name } = request.body;
    
        const updateCategoryService = new CategoryService();
  
        try {
            await updateCategoryService.update({ id, name }).then(() => {
                request.flash("success_msg","categoria actualizada correctamente")
                response.redirect("./category")
            });
        } catch (err) {
            request.flash("error_msg", "fallo al actualizar la categoria");
            response.redirect("./editCategory")
        }  
    }
}

export default CategoryController;