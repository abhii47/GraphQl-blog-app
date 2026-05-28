import { Comment, Post, User } from "../models";
import { LoginParams, RegisterParams } from "../types";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/token";

export const Resolvers = {
    Query:{
        // users: async () => {
        //     const users = await User.findAll({
        //         include: [
        //             {
        //                 model:Post,
        //                 as:'posts'
        //             }
        //         ]
        //     });
        //     return {
        //         totalUser:users.length,
        //         users
        //     }
        // },

        // posts: async() => {
        //     const posts = await Post.findAll({
        //         include:[
        //             {
        //                 model:User,
        //                 as:'creator'
        //             },
        //             {
        //                 model:Comment,
        //                 as:'comments'
        //             }
        //         ]
        //     });
        //     return {
        //         totalPost:posts.length,
        //         posts
        //     }
        // },
    
        user: async(_:any, args:any) => {
            const user = await User.findByPk(args.user_id);
            return user;
        },

        // post: async(_:any, args:any) => {
        //     const post = await Post.findByPk(args.post_id);
        //     return post;
        // },

        // comments: async(_:any, args:any) => {
        //     const comments = await Comment.findAll({
        //         where:{
        //             post_id:args.post_id
        //         }
        //     });
        //     return comments;
        // },
    },
    Mutation:{
        register: async(_:any, args:RegisterParams) => {
            if(!args.name || !args.email || !args.password){
                throw new Error('all fields are required');
            }
            const hasPass = await bcrypt.hash(args.password, 10);
            const emailExist = await User.findOne({
                where:{
                    email:args.email
                }
            });
            if(emailExist){
                throw new Error('email already exist');
            }
            const user = await User.create({
                name:args.name,
                email:args.email,
                password:hasPass
            });
            return user;
        },

        login: async(_:any, args:LoginParams) => {
            const user = await User.findOne({
                where:{
                    email:args.email,
                }
            });
            if(!user){
                throw new Error('user not found');
            }
            const isMatch = await bcrypt.compare(args.password, user.password);
            if(!isMatch){
                throw new Error('password is incorrect');
            }
            const TokenData = {
                user_id:user.user_id,
                name:user.name,
                email:user.email
            }
            const token = generateToken(TokenData);

            return {
                token,
                user
            }
        },
    },
    // Post:{
    //     creator: async(parent:any) => {
    //         const creator= await User.findByPk(parent.creator_id);
    //         return creator;
    //     },
    //     comments: async(parent:any) => {
    //         const comments = await Comment.findAll({
    //             where:{
    //                 post_id:parent.post_id
    //             }
    //         });
    //         return comments;
    //     }
    // },
    // User:{
    //     posts: async(parent:any) => {
    //         const posts = await Post.findAll({
    //             where: {
    //                 creator_id:parent.user_id
    //             }
    //         });
    //         return posts;
    //     }
    // },
    // Comment:{
    //     creator:async(parent:any) => {
    //         const user = await User.findByPk(parent.user_id);
    //         return user;
    //     }
    // }
}