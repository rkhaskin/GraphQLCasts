import gql from 'graphql-tag';

// exec sql
export default gql`
  {
    songs {
      id
      title
    }
  }
`;
