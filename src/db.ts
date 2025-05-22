import logger from "./config/logger";
import { User } from "./user-model";
import { createConnection, getConnectionManager } from "typeorm";

require('reflect-metadata');

export const connectDB = async () => {
  const connectionManager = getConnectionManager();

  if (connectionManager.has("default")) {
    const connection = connectionManager.get("default");

    if (!connection.isConnected) {
      await connection.connect();
      logger.info("Reconectado ao banco de dados");
    } else {
      logger.info("Já conectado ao banco de dados");
    }

    return connection;
  }

  // Se ainda não existe conexão, cria uma nova
  const connection = await createConnection({
    name: "default",
    type: 'postgres',
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    database: process.env.DB_NAME as string,
    entities: [User],
    synchronize: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  });

  logger.info('Conectado ao banco de dados');
  return connection;
};
