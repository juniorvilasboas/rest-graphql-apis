const db = require('../../db')
const Category = require('../../models/category')(db)
const { ApolloError } = require('apollo-server-express')

const getAllCategories = async (context) => {
  let categories = null
  categories = await Category.findAll()
  return categories
}

const getOneCategory = async (context, { id }) => {
  const category = await Category.findOne(id)
  return category
}

const createCategory = async (context, { input }) => {
  const { category } = input
  await Category.create([category])
  return {
    category,
  }
}

const updateCategory = async (context, { id, input }) => {
  const { category } = input
  await Category.update(id, [category])
  return {
    category,
  }
}

const deleteCategory = async (context, { id }) => {
  await Category.remove(id)
  return true
}

module.exports = {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}
