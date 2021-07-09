import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { FC } from 'react';

const contentfulSpaceId =
  process.env.REACT_APP_CONTENTFUL_SPACE_ID;
const contentfulAccessToken =
  process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;

export const contentfulClient = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${contentfulSpaceId}?access_token=${contentfulAccessToken}`,
  cache: new InMemoryCache(),
});

export const ContentfulApiProvider: FC = ({ children }) => {
  return (
    <ApolloProvider client={contentfulClient}>
      {children}
    </ApolloProvider>
  );
};
