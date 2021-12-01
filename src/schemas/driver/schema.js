import { gql }  from 'apollo-server';
export const driverTypeDefs = gql`
type Driver {
    _id : String
    firstName : String
    lastName : String
    vehicleModel : String
    licensePlate : String
    calification : Float
    phoneNumber : String
    email : String
    totalOfComments : Int
}

input DriverInput {
    firstName : String!
    lastName : String!
    vehicleModel : String!
    licensePlate : String!
    phoneNumber : String!
    email : String!
}

type Query {
    getDrivers : [Driver]
    getDriver(_id : String) : Driver
}

type Mutation {
    createDriver(driver : DriverInput) : Driver
    deleteDriver(_id : String) : Boolean
}
`;

export const driverResolvers = {
    Query: {
        getDrivers: (_source, _args, { dataSources }) => {
            return dataSources.servicequalityAPI.getAllDrivers();
        },
        getDriver: (_source, { _id }, { dataSources }) => {
            return dataSources.servicequalityAPI.getDriverById(_id);
        }

    },
    Mutation: {
        createDriver: (_source, { driver }, { dataSources }) => {
            return dataSources.servicequalityAPI.createDriver(driver);
        },
        deleteDriver: (_source, { _id }, { dataSources }) => {
            return dataSources.servicequalityAPI.deleteDriver(_id);
        }
    }
};
