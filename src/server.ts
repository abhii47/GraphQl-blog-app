import { ApolloServer } from "@apollo/server";
import { Resolvers } from "./graphql/resolver";
import { typeDefs } from "./graphql/schema";
import { startStandaloneServer } from "@apollo/server/standalone";
import sequelize from "./config/db";
import { verifyToken } from "./utils/token";

const server = new ApolloServer({
    typeDefs,
    resolvers:Resolvers
});

const Port = Number(process.env.PORT);
const startServer = async() => {
    await sequelize.authenticate();
    console.log('database connected');
    await sequelize.sync({alter:true});
    console.log('database synced');
    const { url } = await startStandaloneServer(server, {
        listen:{
            port:Port
        },
        context: async ({ req }) => {
            const authHeader = req.headers.authorization;
            if(!authHeader) return { user: null };
            if(authHeader.includes('Bearer ')){
                const token = authHeader.split(' ')[1];
                if(!token) return { user: null };
                const user = verifyToken(token);
                return { user };
            }
            return { user: null };
        }
    });
    console.log(`server listening on port: ${url}`);
}
startServer();


