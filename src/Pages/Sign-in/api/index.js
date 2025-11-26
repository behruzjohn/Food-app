import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  query SignIn($phone: String!, $password: String!, $role: RoleEnum!) {
    signIn(data: { phone: $phone, password: $password }, role: $role) {
      token
      user {
        _id
        name
        phone
        role
      }
    }
  }
`;
