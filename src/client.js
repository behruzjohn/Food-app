import { InMemoryCache } from '@apollo/client';
import { ApolloClient, HttpLink } from '@apollo/client';

export const clent = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:8000/api' }),
  cache: new InMemoryCache(),
});
