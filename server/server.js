let express = require('express');
let { graphqlHTTP } = require('express-graphql');
let { buildSchema } = require('graphql');
let morgan = require('morgan');
const db = require('../models');
const { getUsersData, 
  getUserData, 
  createUserData,
  updateUserData} = require('../controllers/user.controller');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    getUsers: [User!]
    getUser(id: ID!): User
  }
  type User {
    id: ID!
    name: String
    email: String
    password: String
    role: String
  }
  input UserInput {
      name: String
      email: String
      password: String
      role: String
  }
  type Mutation {
      createUser(input: UserInput): User
      updateUser(id: ID!, input: UserInput): User
  }
`);


// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  getUsers: () => {
    return getUsersData();
  },
  getUser: ({id}) => {
      return getUserData(id);
  },
  createUser: ({input}) => {
     return createUserData(input);
  },
  updateUser: async ({id, input}) => {
      return updateUserData(id, input);  
  }
};


// express instance
var app = express();

// logging middleware
app.use(morgan('combined'));

// graphql route
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));


app.listen(5000);
console.log('Running a GraphQL API server at http://localhost:5000/graphql');