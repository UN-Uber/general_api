const resolvers = {
    Query: {
        getDrivers: (_source, _args, { dataSources }) => {
            return dataSources.servicequalityAPI.getAllDrivers();
        },
        getDriver: (_source, { id }, { dataSources }) => {
            return dataSources.servicequalityAPI.getDriverById(id);
        }

    },
    Mutation: {

    }
};

export default resolvers;