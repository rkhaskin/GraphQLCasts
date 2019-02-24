import gql from 'graphql-tag';

// exec sql select id, title, lyrics .. where id = :id
export default gql`
  query SongQuery($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
