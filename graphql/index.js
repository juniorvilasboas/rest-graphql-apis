const { ApolloServer, gql } = require('apollo-server-express')
const path = require('path')
const fs = require('fs')

const resolvers = require('./resolvers')

const schema = fs.readFileSync(path.join(__dirname, 'schema.graphql'))
const typeDefs = gql`${schema}`

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers
})

module.exports = graphqlServer