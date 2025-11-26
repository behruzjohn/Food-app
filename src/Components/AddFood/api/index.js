import { gql } from '@apollo/client';

export const GET_ALL_CATAGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      payload {
        _id
        name
        image
      }
    }
  }
`;
export const GET_FOOD_BY_ID = gql`
  query GetFoodById($foodId: ID!) {
    getFoodById(foodId: $foodId) {
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
        }
      }
    }
  }
`;
