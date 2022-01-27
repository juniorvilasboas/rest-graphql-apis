const db = require('../db')
const Product = require('../models/product')(db)

const findAll = async (req, res) => {
  const products = await Product.findAll()
  res.send(products)
}

const findAllPagi = async (req, res) => {
  const product = await Product.findAllPaginated()
  res.send(product)
}

const findOne = async (req, res) => {
  const product = await Product.findOne(req.params.id)
  res.send(product)
}

const create = async (req, res) => {
  const { product, price } = req.body
  await Product.create([product, price])
  res.send({
    success: true,
    data: req.body
  })
}

const edit = async (req, res) => {
  const { product, price } = req.body
  await Product.update(req.params.id, [product, price])
  res.send({
    success: true,
  })
}

const patch = async (req, res) => {
  const oldProduct = await Product.findOne(req.params.id)
  if (req.body.product) {
    oldProduct.product = req.body.product
  }
  if (req.body.price) {
    oldProduct.price = req.body.price
  }

  await Product.update(req.params.id, [oldProduct.product, oldProduct.price])
  res.send({
    success: true,
  })
}

const remove = async (req, res) => {
  await Product.remove(req.params.id)
  res.send({
    success: true,
  })
}

module.exports = {
  findAll,
  findAllPagi,
  findOne,
  create,
  edit,
  patch,
  remove
}