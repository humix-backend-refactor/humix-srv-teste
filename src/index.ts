import express, { Request, Response } from 'express'
import cors from 'cors'
import "reflect-metadata"

import logger from './config/logger'

const app = express()

app.use(cors())

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(8080, () => {
    logger.info("Rodando na porta 8080")
})