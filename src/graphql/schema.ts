export const typeDefs = `#graphql
    type User {
        user_id: ID!
        name: String!
        email: String!

        #posts: [Post]
    }
    type LogResponse {
        token: String!
        user: User!  
    }
    type Query {
        user(user_id:ID!):User  
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
    }
`