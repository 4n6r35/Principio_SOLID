import { DataTypes, Model } from "sequelize";
import DataBase from "../database/database.db";
import { IUserEntity } from "../../domain/entities/User.entity";

interface UserModel extends Model<PartialAnyable<IUserEntity>, 'id_user'>, IUserEntity { };

const User = DataBase.getInstace().getDataSource.define<UserModel>(
    "User",
    {
        id_user: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: DataTypes.STRING(100),
        user_lastname: DataTypes.STRING(100),
        user_age: DataTypes.BIGINT,
        user_birthday: DataTypes.DATE,
        gender: DataTypes.STRING,
        status: DataTypes.BOOLEAN
    },
    {
        tableName: "user",
        createdAt: true,
        updatedAt: true
    }
);

export { User };