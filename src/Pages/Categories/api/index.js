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
