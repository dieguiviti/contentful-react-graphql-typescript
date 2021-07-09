import {
  ApolloError,
  DocumentNode,
  OperationVariables,
  TypedDocumentNode,
  useQuery,
} from '@apollo/client';

type ContentfulData<T> =
  | {
      [key: string]: { items: Array<T> };
    }
  | undefined;

type ContentfulResponse<T> = {
  data: ContentfulData<T>;
  error: ApolloError | undefined;
  loading: boolean;
};

export const useContentful = <T>(
  query:
    | DocumentNode
    | TypedDocumentNode<
        ContentfulData<T>,
        OperationVariables
      >
): ContentfulResponse<T> => {
  const { loading, error, data } = useQuery(query);

  return { data, error, loading };
};

// const [data, setData] = useState<ContentfulData<T>>(
//   {} as ContentfulData<T>
// );

// const [errors, setErrors] = useState(null);
// useEffect(() => {
//   window
//     .fetch(
//       `https://graphql.contentful.com/content/v1/spaces/${contentfulSpaceId}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-type': 'application/json',
//           Authorization: `Bearer ${contentfulAccessToken}`,
//         },
//         body: JSON.stringify({
//           query,
//         }),
//       }
//     )
//     .then((res) => {
//       return res.json();
//     })
//     .then(({ data, errors }) => {
//       if (errors) setErrors(errors);
//       if (data && data !== {}) setData(data);
//       console.log(data);
//     });
// }, [query]);
