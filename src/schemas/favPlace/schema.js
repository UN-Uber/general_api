import { gql }  from 'apollo-server-express';

export const favPlaceTypeDefs = gql`
    type FavPlace {
        id: Int
        name : String
        latitude: Float
        longitude: Float
        userId: Int
    }

    input FavPlaceInput {
        name : String!
        latitude: Float!
        longitude: Float!
        userId: Int!
    }

    type Query {
        getAllFavoritePlaces : [FavPlace]
        getFavoritePlaceById(idPlace: Int) : FavPlace
        getFavoritePlaceByUserId(idUser: Int) : [FavPlace]
    }

    type Mutation {
        createFavoritePlace(favoritePlace: FavPlaceInput) : FavPlace
        deleteFavoritePlace(idPlace: Int) : Boolean
    }
`;

export const favPlaceResolvers = {
    Query: {
        getAllFavoritePlaces: (_source, _args, { dataSources }) => {
            return dataSources.routeAPI.getAllFavoritePlaces();
        },
        getFavoritePlaceById: (_source, { idPlace }, { dataSources }) => {
            return dataSources.routeAPI.getFavoritePlaceById(idPlace);
        },
        getFavoritePlaceByUserId: (_source, { idUser }, { dataSources }) => {
            return dataSources.routeAPI.getFavoritePlaceByUserId(idUser);
        }
    },
    Mutation: {
        createFavoritePlace: (_source, { favoritePlace }, { dataSources }) => {
            return dataSources.routeAPI.createFavoritePlace(favoritePlace);
        },
        deleteFavoritePlace: (_source, { idPlace }, { dataSources }) => {
            return dataSources.routeAPI.deleteFavoritePlace(idPlace);
        }
    }
};