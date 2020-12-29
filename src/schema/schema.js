const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = require('graphql');

const data = [
  { name: 'data1', id: '1' },
  { name: 'data2', id: '2' },
  { name: 'data3', id: '3' },
]

const DataType = new GraphQLObjectType({
  name: 'Data',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    data: {
      type: DataType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return data.find(d => d.id === args.id)
      }
    }

  }
})


module.exports = new GraphQLSchema({
  query: RootQuery
})