import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/db";
import Post from "./postModel";
import User from "./userModel";

class Comment extends Model<InferAttributes<Comment, { omit: 'createdAt' | 'updatedAt' }>, InferCreationAttributes<Comment>>{
    declare comment_id: CreationOptional<number>;
    declare message: string;
    declare post_id: number;
    declare user_id: number;

    declare createdAt:CreationOptional<Date>;
    declare updatedAt:CreationOptional<Date>;
}

Comment.init({
    comment_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    message:{
        type: DataTypes.STRING,
        allowNull:false
    },
    post_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: Post,
            key: 'post_id'
        }
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:'user_id'
        }
    },
},{
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments'
})

export default Comment;