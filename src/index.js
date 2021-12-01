import { ApolloServer }  from 'apollo-server';
import { ServiceQualityApi } from './datasources/ServiceQualityApi.js';
import resolvers from './resolvers/resolvers.js';
import typeDefs from './driver/typeDefs.js';

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0


const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            servicequalityAPI: new ServiceQualityApi(),
        };
    },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});