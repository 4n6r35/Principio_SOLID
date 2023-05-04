import { Op, where } from "sequelize";
import { IUserEntity } from "../../domain/entities/User.entity";
import DatabaseRepository from "../../domain/repositories/Database.repository";
import DataBase from "../database/database.db";
import * as Models from '../models'




class PostgresRepository implements DatabaseRepository {
    constructor(private readonly database: DataBase) { }

    //**Transaccion */
    public async inTransacion<T>(fn: (t: any) => Promise<T>): Promise<T> {
        return await this.database.getDataSource.transaction<T>(async (t) => fn(t))
    }

    //*Obtener todos los usuarios registrados */
    public async getDataUsers(params: {
        page: number;
        size: number;
    }): Promise<{ count: number; rows: Array<IUserEntity> }> {
        const busqueda = await Models.User.findAndCountAll({
            where: {
                status: true
            },
            // attributes: [
            //     "id_user"
            // ],
            // order: ["DESC"],
            limit: params.size,
            offset: params.page,

        });
        return busqueda;
    }

    //* Obtiene usuarios por Id */
    public async getDataUserbyID(
        params: { id_user: number; }
    ): Promise<IUserEntity | null> {
        const data = {
            ...((params.id_user && params.id_user !== 0) && { id_user: params.id_user })
        }
        const GetUser = await Models.User.findOne({
            where: {
                ...data
            }
        })
        return GetUser as any
    }

    public async validarUser(
        body: Partial<IUserEntity>,
        options: PartialNullable<{ transaction: any; }>
    ): Promise<IUserEntity | null> {
        const { transaction = null } = options
        const existeId = " id_user" in body;
        const data = await Models.User.findOne({
            where: {
                [Op.or]: [
                    { user_name: body.user_name },
                    { user_lastname: body.user_lastname },
                ],
                ...(existeId && {
                    id_user: {
                        [Op.notIn]: [body.id_user]
                    }
                })
            },
            ...(transaction && { transaction })
        })
        return data as any
    }

    //*Creación de los usuarios */
    public async createUser(
        body: Partial<Omit<IUserEntity, "id_user" | "createdAt" | "updatedAt">>,
        options: PartialNullable<{ transaction: any; }>
    ): Promise<IUserEntity> {
        const { transaction = null } = options
        const userCreated = await Models.User.create(body as any, {
            ...(transaction && { transaction })
        })
        return userCreated as any
    }

    //*Actualizar de los usuarios */
    public async updateUser(
        body: Partial<Omit<IUserEntity, "createdAt" | "updatedAt">>,
        options: PartialNullable<{ transaction: any; }>
    ): Promise<IUserEntity> {
        const { transaction = null } = options
        const data = {
            user_name: body.user_name,
            user_lastname: body.user_lastname,
            user_age: body.user_age,
            user_birthday: body.user_birthday,
            gender: body.gender
        }
        const userUpdate = await Models.User.update(data, {
            where: {
                id_user: body.id_user
            },
            returning: true,
            ...(transaction && { transaction })
        })
        const response = userUpdate[1][0];
        return response as any
    }

    public async deleteUser(
        params: { id_user: number; },
        options: PartialNullable<{ transaction: any; }>
    ): Promise<IUserEntity> {
        const { id_user } = params
        const { transaction = null } = options
        const deleteUser = await Models.User.findByPk(id_user);
        const del = deleteUser as any
        await del.update({ status: false }, { transaction })
        // const response = deleteUser;
        return del
    }
}

export default PostgresRepository;