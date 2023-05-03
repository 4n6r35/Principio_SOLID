import "dotenv/config";
import { env } from "process";

interface INodeEnvironment {
    REST_PORT: number;
}

class NodeEnvironment implements INodeEnvironment {
    REST_PORT = env.REST_PORT
}

export default new NodeEnvironment();