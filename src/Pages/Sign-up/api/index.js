import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation SignUp($name: String!, $phone: String!, $password: String!) {
    signUp(data: { name: $name, phone: $phone, password: $password }) {
      token
    }
  }
`;
export const CONFIRM_SIGN_UP = gql`
  mutation ConfirmSignUp($code: String!, $token: String!) {
    confirmSignUp(data: { code: $code, token: $token }) {
      token
      user {
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
