const express = require('express')
const bodyParser = require('body-parser')

const routes = require('./routes')
const graphqlServer = require('./graphql')

const port = process.env.PORT || 3000

const app = express()

// Rest
app.use(bodyParser.json())
app.use(routes)

// graphQl
graphqlServer.applyMiddleware({ app })

app.listen(port, (err) => {
  if(err) {
    console.log('Not possible to listen on port: '+port)
  } else {
    console.log('Server running on port: '+port)
  }
})