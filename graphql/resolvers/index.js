const {
  getAllProducts,
  getOneProduct,
  createProduct,
  createImageOnProduct,
  updateProduct,
  deleteProduct,
  deleteImageOnProduct,
} = require('./products')

const {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('./categories')

const resolvers = {
  Query: {
    getAllCategories,
    getOneCategory,
    getAllProducts,
    getOneProduct,
  },
  Mutation: {
    createCategory,
    updateCategory,
    deleteCategory,
    createProduct,
    createImageOnProduct,
    updateProduct,
    deleteProduct,
    deleteImageOnProduct,
  },
}

module.exports = resolvers
