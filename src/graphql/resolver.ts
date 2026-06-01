import { Comment, Post, User } from "../models";
import { LoginParams, RegisterParams } from "../types";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/token";
import { isAuthentication } from "../utils/auth";
import { DateTimeISOResolver } from "graphql-scalars";

export const Resolvers = {
    Date:DateTimeISOResolver,
    Query:{
        posts: async(_:any, args:any, context:any) => {
            isAuthentication(context);
            const { count, rows } = await Post.findAndCountAll({
                limit:args.limit,
                offset:args.offset,
                include:[
                    {
                        model:User,
                        as:'creator',
                    },
                    {
                        model:Comment,
                        as:'comments',
                        include:[
                            {
                                model:User,
                                as:'creator'
                            }
                        ]
                    }
                ],
                distinct:true,
                order:[['createdAt','DESC']]
            });
            return {
                count,
                rows
            };
        },
        me: async(_:any, __:any, context:any) => {
            const userData = isAuthentication(context);
            const user = await User.findByPk(userData.user_id);
            return user;
        },
        getPosts: async(_:any, __:any, context:any) => {
            const user = isAuthentication(context);
            const posts = await Post.findAll({
                where:{
                    creator_id:user.user_id
                }
            });
            return posts;
        },
        getPost: async(_:any, args:any, context:any) => {
            const user = isAuthentication(context);
            const post = await Post.findByPk(args.post_id);
            return post;
        },
        listUser: async(_:any, __:any, context:any) => {
            isAuthentication(context);
            const users = await User.findAll();
            return users;
        },
        getUser: async(_:any, args:any, context:any) => {
            const user = isAuthentication(context);
            const userData = await User.findOne({
                where:{
                    user_id:args.user_id
                },
                attributes:['user_id', 'name'],
                include:[
                    {
                        model:Post,
                        as:'posts'
                    }
                ]
            });
            return userData;
        },


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
            if(!user.password){
                throw new Error('legacy data found');
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
        changePassword: async(_:any, args:any, context:any) => {
            const user = isAuthentication(context);
            const userData = await User.findByPk(user.user_id);
            if(!userData){
                throw new Error('user not found');
            }
            const isMatch = await bcrypt.compare(args.old, userData.password);
            if(!isMatch){
                throw new Error('password is incorrect');
            }
            const hashPass = await bcrypt.hash(args.new, 10);
            await userData.update({
                password:hashPass,
            });
            return true;
        },
        createPost: async(_:any, args:any, context:any) => {
            const user = isAuthentication(context);
            const post = await Post.create({
                title:args.title,
                content:args.content,
                creator_id:user.user_id
            });
            return post;
        },
        updatePost: async(_:any, args:any, context:any) => {
            const user = isAuthentication(context);
            const post = await Post.findByPk(args.post_id);
            if(!post){
                throw new Error('post not found');
            }
            if(post.creator_id !== user.user_id){
                throw new Error('Unauthorized');
            }
            await post.update({
                title: args.title ?? post.title,
                content: args.content ?? post.content
            });
            return post;
        },
        deletePost: async(_:any, args:any, context:any) => {
            const user = isAuthentication(context);
            const post = await Post.findByPk(args.post_id);
            if(!post){
                throw new Error('post not found');
            }
            if(post.creator_id !== user.user_id){
                throw new Error('Unauthorized');
            }
            await Comment.destroy({
                where:{
                    post_id:args.post_id
                }
            });
            await post.destroy();
            return true;
        },
        createComment: async(_:any, args:any, context:any) => {
            const user = isAuthentication(context);
            const post = await Post.findByPk(args.post_id);
            if(!post){
                throw new Error('post not found');
            }
            const comment = await Comment.create({
                message:args.message,
                post_id:args.post_id,
                user_id:user.user_id
            });
            return comment;
        },
        updateComment: async(_:any, args:any, context:any) => {
            const user = isAuthentication(context);
            const comment = await Comment.findByPk(args.comment_id);
            if(!comment){
                throw new Error('comment not found');
            }
            if(comment.user_id !== user.user_id){
                throw new Error('Unauthorized');
            }
            await comment.update({
                message: args.message
            });
            return comment;
        },
        deleteComment: async(_:any, args:any, context:any) => {
            const user = isAuthentication(context);
            const comment = await Comment.findByPk(args.comment_id);
            if(!comment){
                throw new Error('comment not found');
            }
            if(comment.user_id !== user.user_id){
                throw new Error('Unauthorized');
            }
            await comment.destroy();
            return true;
        }
    },
    Post:{
        comments: async(parent:any) => {
            const comments = await Comment.findAll({
                where:{
                    post_id:parent.post_id
                }
            });
            return comments;
        },
    },
    Comment:{
        creator: async(parent:any) => {
            const user = await User.findByPk(parent.user_id);
            return user;
        }
    }
}