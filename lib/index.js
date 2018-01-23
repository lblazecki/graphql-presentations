const express = require('express');
const httpGraphql = require('express-graphql');
const { graphql, buildSchema } = require('graphql');

const server = express();

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

const videoA = {
  id: 1,
  watched: true,
  duration: 90,
  title: 'New A'
};

const videoB = {
  id: 2,
  watched: true,
  duration: 110,
  title: 'ABC'
};

const resolvers = {
  video: () => videoA,
  videos: () => [videoA, videoB]
};

server.use('/graphql', httpGraphql({
  schema,
  graphiql: true,
  rootValue: resolvers
}));

server.listen(3000, () => console.log('Start serving on 3000!'));