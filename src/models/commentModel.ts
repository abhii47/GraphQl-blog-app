import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import Post from "./postModel";
import User from "./userModel";

const Comment = sequelize.define('Comment', {
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
    }
});

export default Comment;