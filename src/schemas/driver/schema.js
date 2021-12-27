import { gql }  from 'apollo-server-express';

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
    occupied: Boolean
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
    getUnoccupiedDriver : Driver
}

type Mutation {
    createDriver(driver : DriverInput) : Driver
    deleteDriver(_id : String) : Boolean
    changeStateDriver(_id : String) : Driver
}
`;

export const driverResolvers = {
    Query: {
        getDrivers: (_source, _args, { dataSources }) => {
            return dataSources.servicequalityAPI.getAllDrivers();
        },
        getDriver: (_source, { _id }, { dataSources }) => {
            return dataSources.servicequalityAPI.getDriverById(_id);
        },
        getUnoccupiedDriver: (_source, _args, { dataSources }) => {
            return dataSources.servicequalityAPI.getUnoccupiedDriver();
        }

    },
    Mutation: {
        createDriver: (_source, { driver }, { dataSources }) => {
            return dataSources.servicequalityAPI.createDriver(driver);
        },
        deleteDriver: (_source, { _id }, { dataSources }) => {
            return dataSources.servicequalityAPI.deleteDriver(_id);
        },
        changeStateDriver: (_source, { _id }, { dataSources }) => {
            return dataSources.servicequalityAPI.changeStateDriver(_id);
        }
    }
};
