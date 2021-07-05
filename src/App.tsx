import {useState, useEffect} from "react";
import './App.css';

const query = `
{
  pageCollection {
    items {
      title
      logo {
        url
      }
    }
  }
}
`

type Page = {
  title: string;
  logo: {
    url: string
  }
}

const contentfulSpaceId = process.env.REACT_APP_CONTENTFUL_SPACE_ID
const contentfulAccessToken = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN

function App() {

  const [page, setPage] = useState({} as Page)

  useEffect(() => {
    window.fetch(
      `https://graphql.contentful.com/content/v1/spaces/${contentfulSpaceId}/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${contentfulAccessToken}`
        },
        body: JSON.stringify({ query })
      }
    ).then(res => {
      return res.json()
    }).then(({ data, errors }) => {
      if (errors) {
        console.log(errors)
      }
      console.log(data)

      setPage(data.pageCollection.items[0])
    })
  }, [])


  return page ? (
    <div className="App">
      <header className="App-header">
        <img src={page.logo ? page.logo.url : ''} className="App-logo" alt="logo" />
        <p>
          {page ? page.title : ''}
        </p>
      </header>
    </div>
  ) : <h1>Loading...</h1>;
}

export default App;
