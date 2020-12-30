const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = require('graphql');
require('dotenv').config();
const { DATABASE_URL } = require('../config');
const UserService = require('../services/user-service');
const AuthService = require('../services/auth-service');
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});

// async function testing() {
//   let t = await UserService.hasUserWithEmail(db, 'r.a.reill18@gmail.com')
//   console.log(t)
// }
// testing()
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  })
})

const AuthData = new GraphQLObjectType({
  name: 'AuthData',
  fields: () => ({
    userId: { type: GraphQLID },
    token: { type: GraphQLString },
    payload: { type: GraphQLString }
  })
})

const LoginType = new GraphQLObjectType({
  name: 'Login',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    authToken: { type: GraphQLString },
    message: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    login: {
      type: LoginType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const validUser = await UserService.hasUserWithEmail(db, args.email)

        if (!validUser) {
          return {
            id: null,
            name: null,
            email: null,
            authToken: null,
            message: 'This is not a valid user'
          };
        }

        const compareMatch = await AuthService.comparePasswords(args.password, validUser.password)

        if (!compareMatch) {
          return {
            id: null,
            name: null,
            email: null,
            authToken: null,
            message: 'This is the incorrect password'
          };
        }

        const sub = validUser.email;
        const payload = { message: 'hi' }

        return {
          name: validUser.name,
          email: validUser.email,
          id: validUser.id,
          authToken: AuthService.createJwt(sub, payload),
          message: null
        }
      }
    }

  }
})


module.exports = new GraphQLSchema({
  query: RootQuery
})