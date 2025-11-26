import { gql } from '@apollo/client';

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
export const DELETE_FOOD_FROM_FAVOURITES = gql`
  mutation RemoveFoodFromFavorites($foodId: ID!) {
    removeFoodFromFavorites(foodId: $foodId) {
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
      }
    }
  }
`;
export const CREATE_CARD = gql`
  mutation CreateCartItem($data: CartItemInput!) {
    createCartItem(data: $data) {
      payload {
        _id
        quantity
        price
        discount
        user
        food {
          _id
          shortName
          name
          image
          description
          price
          discount
          likes
          isFavorite
        }
      }
    }
  }
`;
