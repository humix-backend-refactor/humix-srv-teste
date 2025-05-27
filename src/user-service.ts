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

        const emailLivre = await this.repo.findOne({where: {email: email}})

        if(!emailLivre){
            throw new Error('Este email já está em uso')
        }

        const user = this.repo.create(newUser)

        logger.info('Usuario criado com sucesso')

        return this.repo.save(user)
    }

    async login(email: string, senha: string){

        if(email == '' || senha == '' ){
            throw new Error('Preencha todos os campos')
        }

        const user = await this.repo.findOne({where: {email: email}})

        if(!user){
            throw new Error('Usuário não encontrado')
        }

        if (senha !== user.senha) {
            throw new Error('Senha incorreta')
        }

        return user
    }
}