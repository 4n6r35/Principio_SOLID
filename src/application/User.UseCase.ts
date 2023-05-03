import { UserDuplicateValues } from "../domain/Exceptions/User.exeption";
import { IUserEntity } from "../domain/entities/User.entity";
import DatabaseRepository from "../domain/repositories/Database.repository";
import { TransactionalRepository } from "../domain/repositories/Transactional.repository";
import { UserRepository } from "../domain/repositories/User.repository";
import { CreateUserDTO } from "./DTOs/Input/CreateUser.dto";
import { DeleteUserDTO } from "./DTOs/Input/DeleteUser.dto";
import { UpdateUserDTO } from "./DTOs/Input/UpdateUser.dto";
import { UserDTO } from "./DTOs/Output/User.dto";
import { UserMapper } from "./Mappers/User.mappers";

export class UserUseCase {
    private readonly _userRepository: UserRepository;
    private readonly _transactionalRepository: TransactionalRepository;

    constructor(databaseRepository: DatabaseRepository) {
        this._userRepository = databaseRepository
        this._transactionalRepository = databaseRepository
    }

    //-- Obtiene todos los usuarios --
    public async getDataUser(): Promise<{ id_user: bigint, name: string, lastname: string, birthday: Date, gender: string, age: number }[]> {
        const data = await this._userRepository.getDataUsers();
        return data.map((user) => ({ id_user: user.id_user, name: user.user_name, lastname: user.user_lastname, birthday: user.user_birthday, gender: user.gender, age: user.user_age }))
    }

    //-- Obtiene los usuarios por Id --
    public async getDataUserById(params: {
        id_user: number
    }) {
        const dataUser = await this._userRepository.getDataUserbyID(params)
        return dataUser;
    }

    //-- Crear usuario --
    public async createUser(body: Partial<CreateUserDTO>): Promise<UserDTO | null> {
        const response = await this._transactionalRepository.inTransacion(async (transaction) => {
            const { user_birthday, ...data } = body

            const validators = await this._userRepository.validarUser(data, {
                transaction
            })
            //Validar que los campos sean iguales
            if (validators) {
                throw new UserDuplicateValues("Los datos que intenta registrar ya existen")
            }

            // Calculamos la edad a partir de la fecha de nacimiento
            const DateNac = new Date(user_birthday as Date);
            const age = Math.floor((Date.now() - DateNac.getTime()) / 31557600000);

            const userCreated = await this._userRepository.createUser({
                ...body,
                user_age: age
            },
                {
                    transaction
                })
            return UserMapper.toDTO(userCreated)
        })
        return response
    }

    //-- Delete usuario --
    public async deletedUser(params: { id_user: number }): Promise<UserDTO | null> {
        const response = await this._transactionalRepository.inTransacion(async (transaction) => {
            const userUpdate = await this._userRepository.deleteUser(params, {
                transaction
            })
            return UserMapper.toDTO(userUpdate)
        })
        return response;
    }

    //-- Actualizar usuario --
    public async updatedUser(body: Partial<UpdateUserDTO>): Promise<UserDTO | null> {
        const response = await this._transactionalRepository.inTransacion(async (transaction) => {
            const { id_user, ...data } = body;

            //Validar que los campos sean iguales
            const validators = await this._userRepository.validarUser({
                ...data,
                id_user: id_user
            },
                {
                    transaction
                })
            if (validators) {
                throw new UserDuplicateValues('Los datos que intenta actualizar ya se encuentrarn en otros registros')
            }
            const userUpdate = await this._userRepository.updateUser({
                ...data,
                id_user: id_user
            },
                {
                    transaction
                })
            return UserMapper.toDTO(userUpdate)
        })
        return response;
    }
}