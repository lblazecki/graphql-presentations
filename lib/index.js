const express = require('express');
const graphqlHTTP = require('express-graphql');
const { getVideos } = require('./data');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
  } = require('graphql');

const server = express();

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A video',
  fields: {
    id: {
      type: GraphQLID,
      description: 'id'
    },
    title: {
      type: GraphQLString,
      description: 'title'
    },
    duration: {
      type: GraphQLInt,
      description: 'duration'
    },
    watched: {
      type: GraphQLBoolean
    }
  }
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'root query type',
  fields: {
    videos: {
      type: new GraphQLList(videoType)
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType
});

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  rootValue: { videos: getVideos }
}));

server.listen(3000, () => {
  console.log('Listening on 3000');
});

