import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db";

class User extends Model<InferAttributes<User, { omit: 'createdAt' | 'updatedAt'}>, InferCreationAttributes<User>>{
    declare user_id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare password: string;

    declare createdAt:CreationOptional<Date>;
    declare updatedAt:CreationOptional<Date>;
}

User.init({
    user_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:true
    },
    email:{
        type: DataTypes.STRING,
        allowNull:true
    },
    password:{
        type: DataTypes.STRING,
        allowNull:true
    }
},{
    sequelize,
    modelName: 'User',
    tableName: 'Users',
});

export default User;