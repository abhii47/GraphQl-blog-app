import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const User = sequelize.define('User', {
    user_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    }
});

export default User;