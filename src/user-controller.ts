import { Router, Request, Response } from "express"
import { UserService } from "./user-service"
import logger from "./config/logger"

const userService = new UserService()

export const UserController = {
    async createUser(req: Request, res: Response){
        logger.debug(req.body)
        
        const {nome, email, senha} = req.body
        const user = await userService.createUser(nome, email, senha)

        
        logger.info('Criando usuário')
        
        res.status(201).json(user)
    }
}


