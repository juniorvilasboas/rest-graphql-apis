const express = require('express')

const port = process.env.PORT || 3000

const app = express()

app.get('/products', (req, res) => {
  res.send({
    products: ['All products']
  })
})

app.listen(port, (err) => {
  if(err) {
    console.log('Not possible to listen on port: '+port)
  } else {
    console.log('Server running on port: '+port)
  }
})