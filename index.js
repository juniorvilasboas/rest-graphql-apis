const express = require('express')
const bodyParser = require('body-parser')

const routes = require('./routes/index')

const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())

app.use(routes)

app.listen(port, (err) => {
  if(err) {
    console.log('Not possible to listen on port: '+port)
  } else {
    console.log('Server running on port: '+port)
  }
})