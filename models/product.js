const init = (connection) => {
  const create = async (data) => {
    const conn = await connection
    await conn.query(
      'insert into products (product, price) values (?, ?)',
      data
    )
  }

  const remove = async (id) => {
    const conn = await connection
    await conn.query('delete from products where id = ? limit 1', [id])
  }

  const removeImage = async (productId, id) => {
    const conn = await connection
    await conn.query(
      'delete from images where product_id = ? and id = ? limit 1',
      [productId, id]
    )
  }

  const update = async (id, data) => {
    const conn = await connection
    await conn.query(
      'update products set product = ?, price = ? where id = ?',
      [...data, id]
    )
  }
  const findImages = async (results) => {
    if (results.length === 0) {
      return []
    }
    const conn = await connection
    const productIds = results.map((product) => product.id).join(',')
    const [image] = await conn.query(
      'select * from images where product_id in (' +
        productIds +
        ') group by product_id'
    )
    const mapImages = image.reduce((anterior, atual) => {
      return {
        ...anterior,
        [atual.product_id]: atual,
      }
    }, {})

    const products = results.map((product) => {
      return {
        ...product,
        image: mapImages[product.id],
      }
    })
    return products
  }
  const findAll = async () => {
    const conn = await connection
    const [results] = await conn.query('select * from products')
    return findImages(results)
  }
  const findOne = async (id) => {
    const conn = await connection
    const [result] = await conn.query(`select * from products where id = ${id}`)
    const productWithImage = await findImages(result)
    return productWithImage[0]
  }
  const findAllPaginated = async ({ pageSize = 1, currentPage = 0 } = {}) => {
    const conn = await connection
    const [results] = await conn.query(
      `select * from products limit ${currentPage * pageSize}, ${pageSize + 1}`
    )
    const hasNext = results.length > pageSize

    if (results.length > pageSize) {
      results.pop()
    }
    const resultsWithImages = await findImages(results)

    return {
      data: resultsWithImages,
      hasNext,
    }
  }
  const findAllByCategory = async (categoryId) => {
    const conn = await connection
    const [results] = await conn.query(
      'select * from products where id in (select product_id from categories_products where category_id = ?)',
      [categoryId]
    )
    return findImages(results)
  }
  const addImage = async (productId, data) => {
    const conn = await connection
    await conn.query(
      'insert into images (product_id, description, url) values (?,?,?)',
      [productId, ...data]
    )
  }
  const updateCategories = async (productId, categoryIds) => {
    const conn = await connection
    await conn.query('START TRANSACTION')
    await conn.query('delete from categories_products where product_id = ?', [
      productId,
    ])
    for await (const categoryId of categoryIds) {
      await conn.query(
        'insert into categories_products (category_id, product_id) values (?,?)',
        [categoryId, productId]
      )
    }
    await conn.query('COMMIT') // ROLLBACK
  }

  return {
    create,
    remove,
    update,
    updateCategories,
    findAll,
    findOne,
    findAllPaginated,
    findAllByCategory,
    addImage,
    removeImage,
  }
}
module.exports = init
