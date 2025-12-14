import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: 'https://food-backend-9r5x.onrender.com/api',
});

const authLink = setContext((_, { headers }) => {
  const localToken = JSON.parse(localStorage.getItem('authStore')) || {};
  const token = localToken?.state?.token;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const clientAppollo = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
