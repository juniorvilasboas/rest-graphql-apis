const db = require('../db')
const Product = require('../models/product')(db)

const findAll = async (req, res) => {
  let products = null
  if (req.query.categoryId) {
    products = await Product.findAllByCategory(req.query.categoryId)
  } else {
    products = await Product.findAll()
  }
  res.send(products)
}

const findAllPagi = async (req, res) => {
  const product = await Product.findAllPaginated(req.query)
  res.send(product)
}

const findOne = async (req, res) => {
  const product = await Product.findOne(req.params.id)
  if (!product) {
    return res.send({
      success: false,
      message: 'Product not found.'
    })
  }
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
  if (!oldProduct) {
    return res.send({
      success: false,
      message: 'Product not found.'
    })
  }
  if (req.body.product) {
    oldProduct.product = req.body.product
  }
  if (req.body.price) {
    oldProduct.price = req.body.price
  }

  await Product.update(req.params.id, [oldProduct.product, oldProduct.price])

  if (req.body.categories) {
    try {
      await Product.updateCategories(req.params.id, req.body.categories)
    } catch (err) {
      return res.send({
        success: false,
        message: 'Categories not found.'
      })
    }
  }
  res.send({
    success: true,
  })
}

const remove = async (req, res) => {
  const prodcut = await Product.findOne(req.params.id)
  if (!prodcut) {
    return res.send({
      success: false,
      message: 'Product not found.'
    })
  }
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