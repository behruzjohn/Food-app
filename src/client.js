import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: 'https://radiative-marlin-unplayed.ngrok-free.dev/api',
  // uri: 'http://localhost:8000/api',
});

const authLink = setContext((_, { headers }) => {
  if (localStorage.getItem('authStore')) {
    const localToken = JSON.parse(localStorage.getItem('authStore')) || {};
    const token = localToken?.state?.token;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  }
});

export const clientAppollo = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
