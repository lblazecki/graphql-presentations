const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
  type Video {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean
  }
  type Query {
    video : Video,
    videos: [Video]
  }
  type Schema {
    query: Query
  }
`);

const resolvers = {
  video: () => ({
    id: 12,
    watched: true,
    duration: 123
  })
};

const query = `
  query video_query {
    video {
      id
      title
      watched
    }
  }
`;


graphql(schema, query, resolvers).then(console.log);