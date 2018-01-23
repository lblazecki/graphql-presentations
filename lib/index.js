const express = require('express');
const httpGraphql = require('express-graphql');
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

const resolvers = {
  videos: () => getVideos
};

server.use('/graphql', httpGraphql({
  schema,
  graphiql: true,
  rootValue: resolvers
}));

server.listen(3000, () => console.log('Start serving on 3000!'));

