import { ApolloServer }  from 'apollo-server';
import  _ from 'lodash';
import { ServiceQualityApi } from './datasources/ServiceQualityApi.js';
import {driverResolvers , driverTypeDefs} from './schemas/driver/schema.js';
import {userCTypeDefs , userCResolvers} from './schemas/userCalif/schema.js';
import {commentTypeDefs, commentResolvers} from './schemas/comment/schema.js';
import { communicationResolvers, communicationTypeDefs } from './schemas/communication/schema.js';
import { CommunicationApi } from './datasources/CommunicationApi.js';

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

const server = new ApolloServer({
    typeDefs: [driverTypeDefs, communicationTypeDefs, userCTypeDefs, commentTypeDefs],
    resolvers: _.merge(driverResolvers, communicationResolvers, userCResolvers, commentResolvers),
    dataSources: () => {
        return {
            servicequalityAPI: new ServiceQualityApi(),
            communicationAPI: new CommunicationApi()
        };
    }
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
