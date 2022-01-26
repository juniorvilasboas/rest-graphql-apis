const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer, gql } = require('apollo-server-express')

const routes = require('./routes/index')

const port = process.env.PORT || 3000

const app = express()

// Rest
app.use(bodyParser.json())
app.use(routes)

// graphQl
const typeDefs = gql`
  type Query {
    getAllProducts: String
  }
`
const resolvers = {
  Query: {
    getAllProducts: () => 'All products'
  }
}

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers
})

graphqlServer.applyMiddleware({ app })

app.listen(port, (err) => {
  if(err) {
    console.log('Not possible to listen on port: '+port)
  } else {
    console.log('Server running on port: '+port)
  }
})