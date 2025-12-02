import { gql } from '@apollo/client';

export const FORGOT_PASSWORD = gql`
  mutation ChangeUserPasswordById($data: UpdateUserPasswordInput!) {
    changeUserPasswordById(data: $data) {
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
