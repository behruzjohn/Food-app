import { gql } from '@apollo/client';

export const GET_ALL_CATEGORIES = gql`
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

export const CREATE_CATEGORIES = gql`
  mutation CreateCategory($name: String!, $image: String!) {
    createCategory(category: { name: $name, image: $image }) {
      payload {
        _id
        name
        image
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategoryById2($categoryId: ID!) {
    deleteCategoryById(categoryId: $categoryId) {
      payload {
        _id
        name
        image
      }
    }
  }
`;
export const GET_FOODS_BY_CATEGORY = gql`
  query GetAllFoods($categories: [ID]) {
    getAllFoods(categories: $categories) {
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
      }
    }
  }
`;
export const GET_CATEOGRY_BY_ID = gql`
  query GetCategoryById($categoryId: ID!) {
    getCategoryById(categoryId: $categoryId) {
      payload {
        _id
        name
        image
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
