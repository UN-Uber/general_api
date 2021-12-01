import { ApolloServer }  from 'apollo-server';
import  _ from 'lodash';
import { ServiceQualityApi } from './datasources/ServiceQualityApi.js';
import {driverResolvers , driverTypeDefs} from './driver/schema.js';
import {userCTypeDefs , userCResolvers} from './userCalif/schema.js';

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0


const server = new ApolloServer({
    typeDefs: [driverTypeDefs, userCTypeDefs],
    resolvers: _.merge(driverResolvers, userCResolvers),
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