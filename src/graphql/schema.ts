export const typeDefs = `#
    scalar Date
    type User {
        user_id: ID!
        name: String!
        email: String!
        createdAt: Date!
        updatedAt: Date!
    }
    type UserPosts {
        user_id: ID!
        name: String!

        posts:[Post]
    }
    type LogResponse {
        token: String!
        user: User!  
    }
    type Post {
        post_id: ID!
        title: String!
        content: String!
        creator_id: ID!
        createdAt: Date!
        updatedAt: Date!

        comments: [Comment]
    }
    type posts {
        post_id: ID!
        title: String!
        content: String!
        createdAt: Date!
        updatedAt: Date!

        creator:User
        comments:[Comment]
    }
    type AllPosts {
        count: Int!
        rows:[posts]
    }
    type Comment {
        comment_id: ID!
        message: String!
        post_id: ID!
        createdAt: Date!
        updatedAt: Date!

        creator: User
    } 
    type Query {
        posts(limit: Int, offset: Int):AllPosts
        post(post_id:ID!):Post
        me:User
        getPosts:[Post]
        getPost(post_id:ID!):Post
        listUser:[User]
        getUser(user_id:ID!):UserPosts
    }
    type Mutation {
        register(
            name:String!
            email:String!
            password:String!
        ):User
        login(
            email:String!
            password:String!
        ):LogResponse
        changePassword(
            old:String!, 
            new:String!
        ):Boolean

        createPost(
            title:String!
            content:String!
        ):Post
        updatePost(
            post_id:ID!
            title:String
            content:String
        ):Post
        deletePost(
            post_id:ID!
        ):Boolean
        
        createComment(
            message:String!
            post_id:ID!
        ):Comment
        updateComment(
            comment_id:ID!
            message:String!
        ):Comment
        deleteComment(
            comment_id:ID!
        ):Boolean
    }
`