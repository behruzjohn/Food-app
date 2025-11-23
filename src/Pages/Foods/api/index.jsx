import { gql } from '@apollo/client';

export const ADD_FOODS = gql`
  mutation CreateFood($food: FoodInput!, $image: Upload) {
    createFood(image: $image, food: $food) {
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
export const GET_ALL_FOODS = gql`
  query GetAllFoods {
    getAllFoods {
      totalDocs
      limit
      totalPages
      page
      pagingCounter
      hasPrevPage
      hasNextPage
      prevPage
      nextPage
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
export const ADD_FOOD_FAVOURITES = gql`
  mutation AddFoodToFavorites($foodId: ID!) {
    addFoodToFavorites(foodId: $foodId) {
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
export const DELETE_FOOD = gql`
  mutation DeleteFoodById($foodId: ID!) {
    deleteFoodById(foodId: $foodId) {
      payload {
        _id
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
export const UPDATE_FOOD = gql`
  mutation UpdateFoodById($foodId: ID!, $food: FoodUpdateInput!) {
    updateFoodById(foodId: $foodId, food: $food) {
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
