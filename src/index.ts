import express, { Request, Response } from 'express'
import cors from 'cors'
import { connectDB } from './db'

import dotenv from 'dotenv'
dotenv.config()

import logger from './config/logger'
import router from './user-routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/", router)

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(8080, async () => {
    logger.info("Rodando na porta 8080")

    await connectDB()
})