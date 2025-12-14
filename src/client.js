import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useNavigate } from 'react-router-dom';

const httpLink = new HttpLink({
  url: 'https://food-backend-9r5x.onrender.com/api',
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
