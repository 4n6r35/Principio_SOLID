import { Sequelize } from "sequelize";
import databaseEnv from "../environments/database.env";


class DataBase {
    public static instance: DataBase;
    private dataSource: Sequelize;

    private constructor() {
        this.dataSource = new Sequelize({
            dialect: databaseEnv.DB_DIALECT,
            host: databaseEnv.DB_HOST,
            port: databaseEnv.DB_PORT,
            username: databaseEnv.DB_USER,
            password: databaseEnv.DB_PASS,
            database: databaseEnv.DB_NAME,
            // logging: undefined
        })
    }

    public static getInstace(): DataBase {
        if (!DataBase.instance) {
            DataBase.instance = new DataBase();
        }
        return DataBase.instance;
    }

    public get getDataSource() {
        return this.dataSource;
    }

    public async connect(): Promise<void> {
        try {
            await this.dataSource.authenticate();
            console.log("Conexión establecida con la Base de datos.");
        } catch (error) {
            console.log(error);
            console.error('Ha ocurrido un error al conectar la Base de Datos');
        }
    }
}

export default DataBase;
