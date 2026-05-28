import { Comment, Post, User } from "../models";

export const Resolvers = {
    Query:{
        users: async () => {
            const users = await User.findAll({
                include: [
                    {
                        model:Post,
                        as:'posts'
                    }
                ]
            });
            return {
                totalUser:users.length,
                users
            }
        },

        posts: async() => {
            const posts = await Post.findAll({
                include:[
                    {
                        model:User,
                        as:'creator'
                    },
                    {
                        model:Comment,
                        as:'comments'
                    }
                ]
            });
            return {
                totalPost:posts.length,
                posts
            }
        },
    
        user: async(_:any, args:any) => {
            const user = await User.findByPk(args.user_id);
            return user;
        },

        post: async(_:any, args:any) => {
            const post = await Post.findByPk(args.post_id);
            return post;
        },

        comments: async(_:any, args:any) => {
            const comments = await Comment.findAll({
                where:{
                    post_id:args.post_id
                }
            });
            return comments;
        },
    },
    Mutation:{
        createUser: async(_:any, args:any) => {
            const user = await User.create({
                name:args.name
            });
            return user;
        },

        updateUser: async(_:any, args:any) => {
            await User.update({
                name:args.name
            },{
                where:{
                    user_id:args.user_id
                }
            });
            const user = await User.findByPk(args.user_id);
            return user;
        },

        deleteUser: async(_:any, args:any) => {
            const user = await User.findByPk(args.user_id);
            user?.destroy();
            return user;
        },

        createPost: async(_:any, args:any) => {
            const post = await Post.create({
                title:args.title,
                content:args.content,
                creator_id:args.creator_id
            });
            return post;
        },

        updatePost: async(_:any, args:any) => {
            await Post.update({
                title:args.title,
                content:args.content
            },{
                where:{
                    post_id:args.post_id
                }
            });
            const post = await Post.findByPk(args.post_id);
            return post;
        },

        deletePost: async(_:any, args:any) => {
            const post = await Post.findByPk(args.post_id);
            post?.destroy();
            return post;
        },

        createComment: async(_:any, args:any) => {
            const comment = await Comment.create({
                message:args.message,
                post_id:args.post_id,
                user_id:args.user_id
            });
            return comment;
        },

        updateComment: async(_:any, args:any) => {
            await Comment.update({
                message:args.message
            },{
                where:{
                    comment_id:args.comment_id
                }
            });
            const comment = await Comment.findByPk(args.comment_id);
            return comment;
        },

        deleteComment: async(_:any, args:any) => {
            const comment = await Comment.findByPk(args.comment_id);
            comment?.destroy();
            return comment;
        }
    },
    Post:{
        creator: async(parent:any) => {
            const creator= await User.findByPk(parent.creator_id);
            return creator;
        },
        comments: async(parent:any) => {
            const comments = await Comment.findAll({
                where:{
                    post_id:parent.post_id
                }
            });
            return comments;
        }
    },
    User:{
        posts: async(parent:any) => {
            const posts = await Post.findAll({
                where: {
                    creator_id:parent.user_id
                }
            });
            return posts;
        }
    },
    Comment:{
        creator:async(parent:any) => {
            const user = await User.findByPk(parent.user_id);
            return user;
        }
    }
}