const init = (connection) => {
  const create = async (data) => {
    const conn = await connection
    await conn.query('insert into categories (category) values (?)', data)
  }

  const remove = async (id) => {
    const conn = await connection
    await conn.query('delete from categories where id = ? limit 1', [id])
  }
  const update = async (id, data) => {
    const conn = await connection
    await conn.query('update categories set category = ? where id = ?', [
      ...data,
      id,
    ])
  }

  const findAll = async () => {
    const conn = await connection
    const [results] = await conn.query('select * from categories')
    return results
  }

  const findAllPaginated = async ({ pageSize = 2, currentPage = 0 } = {}) => {
    const conn = await connection
    const [results] = await conn.query(
      `select * from categories limit ${currentPage * pageSize}, ${
        pageSize + 1
      }`
    )
    const hasNext = results.length > pageSize

    if (results.length > pageSize) {
      results.pop()
    }

    return {
      data: results,
      hasNext,
    }
  }

  const findOne = async (id) => {
    const conn = await connection
    const [result] = await conn.query(
      `select * from categories where id = ${id}`
    )
    return result[0]
  }

  return {
    findAll,
    findAllPaginated,
    findOne,
    create,
    update,
    remove,
  }
}
module.exports = init
