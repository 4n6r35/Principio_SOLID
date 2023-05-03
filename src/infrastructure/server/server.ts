import { Application } from "express";
import UserRoute from "../routes/User.routes"
import cors from "cors"
import express from "express";
import DataBase from "../database/database.db";
import nodeEnv from "../environments/node.env";




class Server {
    private app: Application;

    constructor(private dataBase: DataBase) {
        this.app = express();
        this.startDataBase();
        this.loadMiddlewares();
        this.loadRoutes();
    }

    private loadMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }))
    }

    private async loadRoutes() {
        this.app.use(
            '/api',
            UserRoute
        )
    }

    private async startDataBase() {
        await this.dataBase.connect()
    }

    public listen() {
        this.app.listen(nodeEnv.REST_PORT, () => {
            console.log("Servidor corriendo en puerto " + nodeEnv.REST_PORT);
        });
    }
}

export default Server