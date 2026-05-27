import { ApolloServer } from "@apollo/server";
import { Resolvers } from "./graphql/resolver";
import { typeDefs } from "./graphql/schema";
import { startStandaloneServer } from "@apollo/server/standalone";
import sequelize from "./config/db";

const server = new ApolloServer({
    typeDefs,
    resolvers:Resolvers
});

const Port = Number(process.env.PORT);
const startServer = async() => {
    await sequelize.authenticate();
    console.log('database connected');
    await sequelize.sync();
    console.log('database synced');
    const { url } = await startStandaloneServer(server, {
        listen:{
            port:Port
        }
    });
    console.log(`server listening on port: ${url}`);
}
startServer();


