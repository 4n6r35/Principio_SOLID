export interface IUserEntity {
    id_user: bigint;
    user_name: string;
    user_lastname: string;
    user_age: number;
    user_birthday: Date;
    gender: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}