import { gql } from '@apollo/client';

export const GET_CARD_FOOD = gql`
  query GetCartItemsByUserId {
    getCartItemsByUserId {
      payload {
        totalPrice
        items {
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
  }
`;
export const DELETE_CART_ITEM = gql`
  mutation DeleteCartItem($food: ID) {
    deleteCartItem(food: $food) {
      payload {
        _id
        quantity
        price
        discount
        user
      }
    }
  }
`;
export const CREATE_ORDER = gql`
  mutation CreateOrder($order: OrderInput) {
    createOrder(order: $order) {
      payload {
        _id
        address
        createdAt
        createdBy {
          _id
          createdAt
          name
          phone
          photo
          role
          telegramId
          updatedAt
        }
        status
        totalPrice
        updatedAt
      }
    }
  }
`;
