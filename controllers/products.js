const db = require('../db')
const Product = require('../models/product')(db)

const findAll = async (req, res) => {
  const products = await Product.findAll()
  res.send({
    products
  })
}

const findOne = (req, res) => {
  res.send({
    name: 'Product ' + req.params.id
  })
}

const create = async (req, res) => {
  const { product, price } = req.body
  await Product.create([product, price])
  res.send({
    success: true,
    data: req.body
  })
}

const edit = (req, res) => {
  console.log(req.body)
  res.send({
    success: true,
    data: 'Alterado o id: ' + req.params.id
  })
}

const remove = (req, res) => {
  console.log(req.body)
  res.send({
    success: true,
    data: 'Removido o id: ' + req.params.id
  })
}

module.exports = {
  findAll,
  findOne,
  create,
  edit,
  remove
}