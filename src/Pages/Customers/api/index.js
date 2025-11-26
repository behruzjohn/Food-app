import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($filter: UserFilterInput) {
    getUsers(filter: $filter) {
      payload {
        _id
        name
        phone
        role
        photo
        telegramId
        createdAt
        updatedAt
      }
    }
  }
`;
