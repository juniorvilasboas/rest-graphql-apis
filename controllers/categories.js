const db = require('../db')
const Category = require('../models/category')(db)

const findAll = async (req, res) => {
  const categories = await Category.findAll()
  res.send(categories)
}

const findAllPaginated = async (req, res) => {
  const category = await Category.findAllPaginated(req.query)
  res.send(category)
}

const findOne = async (req, res) => {
  const category = await Category.findOne(req.params.id)
  if (!category) {
    return res.send({
      success: false,
      message: 'Category not found.'
    })
  }
  res.send(category)
}

const create = async (req, res) => {
  const { category } = req.body
  await Category.create([category])
  res.send({
    success: true,
    data: req.body
  })
}

const edit = async (req, res) => {
  const { category } = req.body
  await Category.update(req.params.id, [category])
  res.send({
    success: true
  })
}

const remove = async (req, res) => {
  await Category.remove(req.params.id)
  res.send({
    success: true
  })
}

module.exports = {
  findAll,
  findAllPaginated,
  findOne,
  create,
  edit,
  remove
}