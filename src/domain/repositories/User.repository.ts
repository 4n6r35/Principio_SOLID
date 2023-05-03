import { IUserEntity } from "../entities/User.entity";

export interface UserRepository {

    /* Obtener la data de los usuarios*/
    getDataUsers(): Promise<IUserEntity[]>

    /* Obtener la data de los usuario por el ID*/
    getDataUserbyID(params: {
        id_user: number
    }): Promise<IUserEntity | null>

    /* Crear usuario*/
    createUser(
        body: Partial<Omit<IUserEntity, 'id_user' | 'createdAt' | 'updatedAt'>>,
        options: PartialNullable<{ transaction: any }>
    ): Promise<IUserEntity>

    /* Actualizar usuario*/
    updateUser(
        body: Partial<Omit<IUserEntity, 'createdAt' | 'updatedAt'>>,
        options: PartialNullable<{ transaction: any }>
    ): Promise<IUserEntity>

    /* Eliminar Usuario */
    deleteUser(
        params: { id_user: number },
        options: PartialNullable<{ transaction: any }>
    ): Promise<IUserEntity>


    /*Validar campos */
    validarUser(
        body: Partial<IUserEntity>,
        options: PartialNullable<{ transaction: any }>
    ): Promise<IUserEntity | null>
}