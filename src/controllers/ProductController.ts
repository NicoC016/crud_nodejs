import { Request, Response } from "express";
import { productService } from "../services/ProductService";
import ProductService from "../services/ProductService";
import { categoryService } from "../services/CategoryService";
import CategoryService from "../services/CategoryService";



class ProductController {

    async create(request: Request, response: Response) {
        const { productname, price, type, categoryId } = request.body;
        console.log(request.body);

        try {
            await productService.create({
              
              productname,
              price,
              type,
              categoryId
            }).then(() => {
              
              response.render("Product/message", {
                message: "Producto creado con exitosamente",
              });
            });
          } catch (err) {
            
            response.render("Product/message", {
              message: `Error al crear producto: ${err.message}`
            });
          }
  
    }
    
    async add(request: Request,response: Response){
        const category = await categoryService.list();
    
        return response.render("Product/add",{category})
      }

    async delete(request: Request, response: Response) {
        const { id } = request.body;
  
        try {
            await productService.delete(id).then(() => {
                response.render("Product/message", {
                message: "Producto eliminado exitosamente"
                });
            });
        } catch (err) {
            response.render("Product/message", {
                message: `Error al eliminar producto: ${err.message}`
            });
        }
    }

    async get(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const product = await productService.getData(id);
    
        const listarcategoria = new CategoryService();
      
        const category = await listarcategoria.list()
        return response.render("Product/edit", {
          product: product,
          category: category
        });
      } 

    async list(request: Request, response: Response) {
        const products = await productService.list();
        const categoryList = new CategoryService();

        const category = await categoryList.list()
        return response.render("Product/product", {
            products: products,
            category: category
        });
    }

    

    async search(request: Request, response: Response) {
         let { search } = request.query;
         search = search.toString();
  
        try {
            const products = await productService.search(search);
            response.render("Product/search", {
                products: products,
                search: search
            });
        } catch (err) {
            response.render("Product/message", {
                message: `Error al buscar producto: ${err.message}`
            });
        }
    }

    async update(request: Request, response: Response) {
        const { id, productname, price, type, categoryId } = request.body;

        const productService = new ProductService();
  
        try {
            await productService.update({ id, productname, price, type, categoryId }).then(() => {
                response.render("Product/message", {
                    message: "Producto actualizado exitosamente"
                });
            });
        } catch (err) {
            response.render("Product/message", {
            message: `Error al actualizar producto: ${err.message}`
            });
        }  
    }
}

export default ProductController;