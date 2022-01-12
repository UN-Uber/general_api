import { gql }  from 'apollo-server-express';

export const taxingTypeDefs = gql`
#Modelo Taxing
type Taxing {
    startLatitude : Float
    startLongitude: Float
    endLatitude: Float
    endLongitude: Float
    price: String
    uberType: Int
}

type Query {
    getPrices(startLatitude : Float, startLongitude: Float, endLatitude: Float, endLongitude: Float, uberType: Int) : Taxing
}
`;

export const taxingResolvers = {
    Query: {
        getPrices: (_source, { startLatitude , startLongitude, endLatitude, endLongitude, uberType }, { dataSources }) => {
            let ans = dataSources.taxingApi.getPrice(startLatitude, startLongitude, endLatitude, endLongitude, uberType);;
            return ans;
        }
    }
};
