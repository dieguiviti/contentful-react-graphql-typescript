import { gql } from '@apollo/client';
import './App.css';
import { useContentful } from './useContentful';

const query = gql`
  query {
    pageCollection {
      items {
        title
        logo {
          url
        }
      }
    }
  }
`;

const propQuery = gql`
  query {
    propertyCollection {
      items {
        title
        propReference
      }
    }
  }
`;

type Page = {
  title: string;
  logo: {
    url: string;
  };
  richText: Document;
};

type Property = {
  title: string;
  propReference: string;
};

function App() {
  const { data, error, loading } =
    useContentful<Page>(query);

  const properties = useContentful<Property>(propQuery);

  if (!data) {
    return <div>loading...</div>;
  }

  if (error) {
    return (
      <div>Sorry there was an error with your query</div>
    );
  }

  if (loading) {
    return <h1>loading...</h1>;
  }

  const page = data.pageCollection?.items[0];

  return (
    <div className='App'>
      <header className='App-header'>
        <img
          src={page.logo ? page.logo.url : ''}
          className='App-logo'
          alt='logo'
        />
        <p>{page ? page.title : ''}</p>
      </header>
      <div>
        <pre>{JSON.stringify(data)}</pre>{' '}
      </div>
      <div>
        <pre>{JSON.stringify(properties?.data)}</pre>{' '}
      </div>
    </div>
  );
}

export default App;

// return (
//   <div>
//     <pre>{JSON.stringify(data)}</pre>
//   </div>
// );
