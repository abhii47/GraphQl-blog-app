export const typeDefs = `#graphql
    type User {
        user_id: ID!
        name: String!

        posts: [Post]
    }
    type Post {
        post_id: ID!
        title:String!
        content:String!

        creator:User
    }
    type Query {
        users:[User]
        posts:[Post]
        user(user_id:ID!):User
        post(post_id:ID!):Post
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
    }
`