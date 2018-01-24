const express = require('express');
const httpGraphql = require('express-graphql');
const { getMentors, getMentorById } = require('./data');
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

const articleType = new GraphQLObjectType({
  name: 'Article',
  description: 'An article',
  fields: {
    id: {
      type: GraphQLID,
      description: 'id'
    },
    title: {
      type: GraphQLString,
      description: 'name'
    }
  }
});

const mentorType = new GraphQLObjectType({
  name: 'Mentor',
  description: 'A mentor',
  fields: {
    id: {
      type: GraphQLID,
      description: 'id'
    },
    name: {
      type: GraphQLString,
      description: 'name'
    },
    stars: {
      type: GraphQLInt,
      description: 'stars'
    },
    articles: {
      type: new GraphQLList(articleType)
      //resolve(obj, args){
      //  return Resolver(args.id).Address();
      //}
    }
  }
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'root query type',
  fields: {
    mentors: {
      type: new GraphQLList(mentorType),
      resolve: (obj, args) => getMentors(args),
      args: {
        stars: {
          type: new GraphQLList(GraphQLInt),
          description: 'number of stars'
        },
        has_article: {
          type: GraphQLBoolean,
          description: 'has articles'
        }
      }
    },
    mentor: {
      type: mentorType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'id must be provided'
        }
      },
      resolve: (obj, args) => getMentorById(args.id)
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

