import { Router, Request, Response, NextFunction } from "express"
import { UserService } from "./user-service"
import logger from "./config/logger"
import axios from "axios";

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
    },
    
    async getUserAlbum(req: Request, res: Response){
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({ message: "Token não fornecido" });
        }

        try {
            // Faz a requisição para o microserviço de álbuns
            const response = await axios.get(
                "http://humix-srv-album.album.svc.cluster.local:8080/teste",
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            res.status(200).json(response.data);
        } catch (error: any) {
            logger.error(error.message);
            res.status(500).json({ message: "Erro ao buscar álbuns do usuário" });
        }
    },

}


