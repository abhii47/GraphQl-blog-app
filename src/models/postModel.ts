import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import User from "./userModel";

const Post = sequelize.define('Post', {
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
    }
    
});

export default Post;