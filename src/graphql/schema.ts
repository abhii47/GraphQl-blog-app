export const typeDefs = `#graphql
    type User {
        user_id: ID!
        name: String!

        posts: [Post]
    }
    type UserResponse {
        totalUser: Int!
        users: [User]  
    }
    type Post {
        post_id: ID!
        title:String!
        content:String!

        creator:User
        comments:[Comment]
    }
    type PostResponse {
        totalPost: Int!
        posts: [Post]
    }
    type Comment {
        comment_id:ID!
        message:String!

        creator:User
    }
    type Query {
        users:UserResponse                  #get all users
        posts:PostResponse                  #get all posts
        user(user_id:ID!):User              #single user details
        post(post_id:ID!):Post              #get single post details
        comments(post_id:ID!):[Comment]     #get all comments for a post
    }
    type Mutation {
        createUser(
            name:String!
        ):User
        createPost(
            title:String!
            content:String! 
            creator_id:ID!
        ):Post
        updatePost(
            post_id:ID!
            title:String
            content:String
        ):Post
        deletePost(
            post_id:ID!
        ):Post
        createComment(
            message:String!
            post_id:ID!
            user_id:ID!
        ):Comment
    }
`