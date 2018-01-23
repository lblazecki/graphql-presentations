const express = require('express');
const httpGraphql = require('express-graphql');
const { getVideos, getVideoById } = require('./data');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
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
      type: new GraphQLList(videoType),
      resolve: () => getVideos()
    },
    video: {
      type: videoType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'id must be provided'
        }
      },
      resolve: (obj, args) => getVideoById(args.id)
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType
});

server.use('/graphql', httpGraphql({
  schema,
  graphiql: true
}));

server.listen(3000, () => console.log('Start serving on 3000!'));

