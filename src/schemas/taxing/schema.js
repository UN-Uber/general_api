import { gql }  from 'apollo-server-express';

export const taxingTypeDefs = gql`
#Modelo Taxing
type Taxing {
    startLatitude : Float
    startLongitude: Float
    endLatitude: Float
    endLongitude: Float
    price: String
}

type Query {
    getPrices(startLatitude : Float, startLongitude: Float, endLatitude: Float, endLongitude: Float) : Taxing
}
`;

export const taxingResolvers = {
    Query: {
        getPrices: (_source, { startLatitude , startLongitude, endLatitude, endLongitude }, { dataSources }) => {
            let ans = dataSources.taxingApi.getPrice(startLatitude, startLongitude, endLatitude, endLongitude);;
            return ans;
        }
    }
};
