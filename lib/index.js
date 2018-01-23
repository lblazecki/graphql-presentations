const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
  type Video {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean
  }
  type Query {
    video: Video,
    videos: [Video]
  }
  type Schema {
    query: Query
  }
`);

const resolvers = {
  video: () => ({
    id: 1,
    title: 'New v',
    duration: 95
  }),
  videos: () => [
    { id: 1 }, { id : 2 }
  ]
};

const query = `
  query video_query {
    videos {
      id,
      title,
      watched
    }
  }
`;



graphql(schema, query, resolvers).then(console.log);
