import { IUserEntity } from "../../domain/entities/User.entity";
import { UserDTO } from '../DTOs/Output/User.dto';

export class UserMapper {
    public static toDTO(entity: IUserEntity): UserDTO {
        return {
            id: entity.id_user,
            name: entity.user_name,
            lastname: entity.user_lastname,
            age: entity.user_age,
            birthday: entity.user_birthday,
            gender: entity.gender,
            status: entity.status
        }
    }
    public static toArrayDTOs(entities: IUserEntity[]): UserDTO[] {
        return entities.map(entity => UserMapper.toDTO(entity))
    }
}