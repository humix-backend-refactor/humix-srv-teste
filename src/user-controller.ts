import { Router, Request, Response } from "express"
import { UserService } from "./user-service"
import logger from "./config/logger"

const userService = new UserService()

export const UserController = {
    async createUser(req: Request, res: Response){
        const { nome, email, senha } = req.body

        try
        {
            const user = await userService.createUser(nome, email, senha)

            logger.debug('Criando usuário')
            
            res.status(201).json(user)
        }
        catch (error: any)
        {
            logger.error(error.message)
            res.status(400).json({message: 'erro ao criar o usuário'})
        }

    },

    async loginUser(req: Request, res: Response){
        const { email, senha } = req.body

        try
        {
            const user = await userService.login(email, senha)
            logger.debug('Logando usuário')
            res.status(200).json(user)
        } 

        catch (error: any)
        {
            logger.error(error.message)
            res.status(400).json({message: 'Credenciais inválidas'})
        }
        
        
        
    }
}


