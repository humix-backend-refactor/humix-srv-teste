import { User } from "./user-model";
import logger from "./config/logger";
import { getRepository } from "typeorm";

export class UserService {
    private get repo() {
        return getRepository(User)
    }

    async createUser(nome: string, email: string, senha: string){

        if(nome == '' || email == '' || senha == '' ){
            throw new Error('Preencha todos os campos')
        }

        const newUser = new User()
         
        newUser.nome = nome
        newUser.email = email
        newUser.senha = senha

        const user = this.repo.create(newUser)

        logger.info('Usuario criado com sucesso')

        return this.repo.save(user)
    }
}