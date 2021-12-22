import { gql }  from 'apollo-server-express';

export const recordTypeDefs = gql`
type Record {
    id: Int
    date: String
    startLatitude: Float
    startLongitude: Float
    endLatitude: Float
    endLongitude: Float
    startAddress: String
    endAddress: String
    userId: Int
}

input RecordInput {
    date: String!
    startLatitude: Float!
    startLongitude: Float!
    endLatitude: Float!
    endLongitude: Float!
    startAddress: String!
    endAddress: String!
    userId: Int!
}

type Query {
    getAllRecords : [Record]
    getRecordById(idRecord: Int) : Record
    getRecordByUserId(idUser: Int) : [Record]
}

type Mutation {
    createRecord(record: RecordInput) : Record
    deleteRecord(idRecord: Int) : Boolean
}
`;

export const recordResolvers = {
    Query: {
        getAllRecords: (_source, _args, { dataSources }) => {
            return dataSources.routeAPI.getAllRecordedRoutes();
        },
        getRecordById: (_source, { idRecord }, { dataSources }) => {
            return dataSources.routeAPI.getRecordRoutesByUserId(idRecord);
        },
        getRecordByUserId: (_source, { idUser }, { dataSources }) => {
            return dataSources.routeAPI.getRecordByUserId(idUser);
        }
    },
    Mutation: {
        createRecord: (_source, { record }, { dataSources }) => {
            return dataSources.routeAPI.createRecordRoute(record);
        },
        deleteRecord: (_source, { idRecord }, { dataSources }) => {
            return dataSources.routeAPI.deleteRecordRoute(idRecord);
        }
    
    }
};