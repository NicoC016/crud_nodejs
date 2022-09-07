import { Request, Response } from "express";
import UserService from "../services/UserService";


class UserController {

    async create(request: Request, response: Response) {
        const { name, lastName, username, email, phone, city, state,password } = request.body;
    
        const createUserService = new UserService();
    
        try {
            await createUserService.create({
            name,
            lastName,
            username,
            email,
            password,
            phone,
            city,
            state
            }).then(() => {
                request.flash("success_msg","usuario agregado exitosamente");
                response.redirect("./users")
            });
        } catch (err) {
            request.flash("error_msg","fallo al agregar el usuario");
            response.redirect("./addUser")
        }
  
    }

    async delete(request: Request, response: Response) {
        const { id } = request.body;
  
        const deleteUserService = new UserService();
  
        try {
            await deleteUserService.delete(id).then(() => {
                request.flash("success_msg","usuario eliminado exitosamente");
                response.redirect("./users")
            });
        } catch (err) {
            request.flash("error_msg","fallo al eliminar el usuario");
            response.redirect("./users")
        }
    }
    async get(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();

        const getUserDataService = new UserService();

        const user = await getUserDataService.getData(id);

        return response.render("User/edit", {
        user: user
        });
    }

    async list(request: Request, response: Response) {
        const listUsersService = new UserService();
  

        const users = await listUsersService.list();

        return response.render("User/users", {
        users: users
        });
    }

    async search(request: Request, response: Response) {
         let { search } = request.query;
         search = search.toString();
  
        const searchUserService = new UserService();
  
        try {
            const users = await searchUserService.search(search);
            response.render("User/search", {
                users: users,
                search: search
            });
        } catch (err) {
            request.flash("error_msg","fallo al buscar el usuario");
            response.redirect("./users")
        }
    }

    async update(request: Request, response: Response) {
        const { id,name, lastName,username, email, phone, city, state,password } = request.body;
    
        const updateUserService = new UserService();
  
        try {
            await updateUserService.update({ id, name, lastName, username, email, phone, city, state,password }).then(() => {
                request.flash("success_msg","usuario actualizado exitosamente");
                response.redirect("./users")
            });
        } catch (err) {
            request.flash("error_msg","fallo al actualizar el usuario");
            response.redirect("./editUser")
        }  
    }
}

export default UserController;

  