import { Post, User } from "../models";

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
            return users;
        },

        posts: async() => {
            const posts = await Post.findAll({
                include:[
                    {
                        model:User,
                        as:'creator'
                    }
                ]
            });
            return posts;
        },
    
        user: async(_:any, args:any) => {
            const user = await User.findByPk(args.user_id);
            return user;
        },

        post: async(_:any, args:any) => {
            const post = await Post.findByPk(args.post_id);
            return post;
        }
    },
    Mutation:{
        createUser: async(_:any, args:any) => {
            const user = await User.create({
                name:args.name
            });
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
        }
    },
    Post:{
        creator: async(parent:any) => {
            const creator= await User.findByPk(parent.creator_id);
            return creator;
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
    }
}