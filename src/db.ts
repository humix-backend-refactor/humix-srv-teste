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

  logger.debug("Conectando ao banco de dados: " + process.env.DB_HOST)

  const connection = await createConnection({
    name: "default",
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
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
