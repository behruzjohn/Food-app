import { gql } from '@apollo/client';

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

export const GET_ORDER_BY_ID = gql`
  query GetOrdersByUserId($status: String) {
    getOrdersByUserId(status: $status) {
      payload {
        _id
        totalPrice
        status
        address
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_ORDER_FOR_ADMIN = gql`
  query GetOrders($statuses: [String], $page: Int, $limit: Int) {
    getOrders(statuses: $statuses, page: $page, limit: $limit) {
      payload {
        _id
        totalPrice
        status
        address
        createdAt
        updatedAt
        createdBy {
          _id
          name
          phone
          role
          photo
          telegramId
          createdAt
          updatedAt
        }
        orderItems {
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

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatusById($orderId: ID, $status: String) {
    updateOrderStatusById(orderId: $orderId, status: $status) {
      payload {
        _id
        totalPrice
        status
        address
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_ORDER_PRODUCT = gql`
  query GetOrderById($orderId: ID!) {
    getOrderById(orderId: $orderId) {
      payload {
        _id
        totalPrice
        status
        address
        createdAt
        updatedAt
        orderItems {
          _id
          quantity
          price
          discount
          user
        }
      }
    }
  }
`;
export const GET_ORDER_ITEMS = gql`
  query GetOrderById($orderId: ID!) {
    getOrderById(orderId: $orderId) {
      payload {
        _id
        totalPrice
        status
        address
        createdAt
        updatedAt
        orderItems {
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
