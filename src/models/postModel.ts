import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db";
import User from "./userModel";

class Post extends Model<InferAttributes<Post, { omit: 'createdAt' | 'updatedAt' }>, InferCreationAttributes<Post>> {
    declare post_id: CreationOptional<number>;
    declare title: string;
    declare content: string;
    declare creator_id: number;

    declare createdAt:CreationOptional<Date>;
    declare updatedAt:CreationOptional<Date>;
}

Post.init({
    post_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull:false
    },
    content:{
        type: DataTypes.STRING,
        allowNull:false
    },
    creator_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
},{
    sequelize,
    modelName: 'Post',
    tableName: 'Posts',
})

export default Post;