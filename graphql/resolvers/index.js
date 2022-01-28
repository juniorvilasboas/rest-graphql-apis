const { getAllProducts, createProduct, deleteProduct, updateProduct } = require('./products')

const resolvers = {
  Query: {
    getAllProducts
  },
  Mutation: {
    createProduct,
    updateProduct,
    deleteProduct
  }
}

module.exports = resolvers