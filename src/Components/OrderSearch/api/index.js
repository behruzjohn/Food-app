import { gql } from '@apollo/client';

export const GET_FOODS_BY_SEARCH = gql`
  query GetAllFoods($name: String!) {
    getAllFoods(name: $name) {
      payload {
        _id
        shortName
        name
        image
        description
        price
        discount
        likes
        isFavorite
        category {
          _id
          name
          image
        }
      }
    }
  }
`;

export const GET_ALL_FAVOURITE_FOODS = gql`
  query GetFavoriteFoods {
    getFavoriteFoods {
      payload {
        _id
        shortName
        name
        image
        description
        price
        discount
        likes
        isFavorite
        category {
          _id
          name
          image
        }
      }
    }
  }
`;
