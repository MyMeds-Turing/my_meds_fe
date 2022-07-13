import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './Components/App/App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  HttpLink,
  from
} from '@apollo/client';
import { onError } from "@apollo/client/link/error";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//pulled from Pedro example, need to figure out how to make TypeScript happy 

// const errorLink = onError(({ graphqlErrors, networkError }) => {
//   if (graphqlErrors) {
//     graphqlErrors.map(({ message, location, path }) => {
//       alert(`Graphql error ${message}`);
//     });
//   }
// });

const link = from([
  // errorLink,
  new HttpLink({ uri: " https://my-meds-be.herokuapp.com/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);
reportWebVitals();
