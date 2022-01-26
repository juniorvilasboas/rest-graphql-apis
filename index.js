const express = require('express')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())

app.get('/products', (req, res) => {
  res.send({
    products: ['All products']
  })
})

app.get('/products/:id', (req, res) => {
  res.send({
    name: 'Product ' + req.params.id
  })
})

app.post('/products', (req, res) => {
  console.log(req.body)
  res.send({
    success: true,
    data: req.body
  })
})

app.put('/products/:id', (req, res) => {
  console.log(req.body)
  res.send({
    success: true,
    data: 'Alterado o id: ' + req.params.id
  })
})

app.delete('/products/:id', (req, res) => {
  console.log(req.body)
  res.send({
    success: true,
    data: 'Removido o id: ' + req.params.id
  })
})

app.listen(port, (err) => {
  if(err) {
    console.log('Not possible to listen on port: '+port)
  } else {
    console.log('Server running on port: '+port)
  }
})