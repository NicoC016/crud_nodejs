import { Request, Response } from "express";
import { productService } from "../services/ProductService";
import { categoryService } from "../services/CategoryService";




class ProductController {

    async create(request: Request, response: Response) {
        const { productname, price, type, category } = request.body;
        console.log(request.body);

        try {
            await productService.create({  
                productname,
                price,
                type,
                category
            }).then(() => {
              
                request.flash("success_msg","producto agregado exitosamente");
                response.redirect("./products")
            });
          } catch (err) {
            
                request.flash("error_msg","fallo al agregar el producto");
                response.redirect("./addProduct")
          }
  
    }
    
    async add(request:Request, response: Response){
        const category = await categoryService.list();
    
        return response.render("Product/add",{category})
      }

    async delete(request: Request, response: Response) {
        const { id } = request.body;
  
        try {
            await productService.delete(id).then(() => {
                request.flash("success_msg","producto eliminado exitosamente");
                response.redirect("./products")
            });
        } catch (err) {
            request.flash("error_msg","fallo al eliminar el producto");
            response.redirect("./products")
        }
    }

    async get(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const product = await productService.getData(id);
    
        const listarcategoria = categoryService
      
        const category = await listarcategoria.list()
        return response.render("Product/edit", {
          product: product,
          category: category
        });
      } 

    async list(request: Request, response: Response) {
        const products = await productService.list();
        const categoryList = categoryService

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
            request.flash("error_msg","fallo al buscar el producto");
            response.redirect("./products")
        }
    }

    async update(request: Request, response: Response) {
        const { id, productname, price, type, category } = request.body;

        const productServices = productService
  
        try {
            await productServices.update({ id, productname, price, type, category }).then(() => {
                request.flash("success_msg","producto actualizado exitosamente");
                response.redirect("./products")
            });
        } catch (err) {
            request.flash("error_msg","fallo al actualizar el producto");
            response.redirect("./editProduct")
        }  
    }
}

export default ProductController;