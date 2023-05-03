import "dotenv/config";
import { env } from "process";

interface IDataBaseEnvironment {
    DB_DIALECT: string;
    DB_USER: string;
    DB_PASS: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
}

class DataBaseEnvironment implements IDataBaseEnvironment {
    DB_DIALECT = env.DB_DIALECT as any;
    DB_USER = env.DB_USER;
    DB_PASS = env.DB_PASS;
    DB_HOST = env.DB_HOST;
    DB_PORT = env.DB_PORT;
    DB_NAME = env.DB_NAME;
}

export default new DataBaseEnvironment()