import DataBase from "./infrastructure/database/database.db";
import Server from "./infrastructure/server/server";

const server = new Server(DataBase.getInstace());
server.listen()
