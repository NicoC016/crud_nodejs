import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { User } from "../entities/User";

interface IUser {
    id?: string;
    username: string;
    password?:string;
    email: string;
    phone: string;
    city: string;
    state: string;
}

class UserService {

    async create({ username, email, phone, city, state, password }: IUser) {
        if (!username || !email || !phone || !city || !state||!password) {
        throw new Error("Por favor complete todos los campos");
        }

    const usersRepository = getCustomRepository(UsersRepository);

    const usernameAlreadyExists = await usersRepository.findOne({ username });

    if (usernameAlreadyExists) {
        throw new Error("El nombre de usuario ya está registrado");
    }

    const emailAlreadyExists = await usersRepository.findOne({ email });

    if (emailAlreadyExists) {
        throw new Error("El email ya está registrado");
    }

    const user = usersRepository.create({ username, email, phone, city, state, password });

    await usersRepository.save(user);

    return user;

    }


    async delete(id: string) {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("id = :id", { id })
            .execute();

        return user;
    }


    async getData(id:string) {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository.findOne(id);
    
        return user;
    }
    async list(){
        const userRepositori = getCustomRepository(UsersRepository);
        const usuarios = await userRepositori.find();
        return usuarios
    }

    async getDatabyEmail( email:String) {
        const usersRepository2 = getCustomRepository(UsersRepository);
    
        const users = await usersRepository2.find(
            { where: { email:email }}
        );
    
        return users;
    }


    async search(search: string) {
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }
    
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository
            .createQueryBuilder()
            .where("username like :search", { search: `%${search}%` })
            .orWhere("email like :search", { search: `%${search}%` })
            .orWhere("phone like :search", { search: `%${search}%` })
            .orWhere("city like :search", { search: `%${search}%` })
            .orWhere("state like :search", { search: `%${search}%` })
            .getMany();
    
        return user;
    }


    
    async update({ id, username, email, phone, city, state,password }: IUser) {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository
            .createQueryBuilder()
            .update(User)
            .set({ username, email, phone, city, state,password })
            .where("id = :id", { id })
            .execute();

        return user;
    }
    
};

export default UserService;
  
