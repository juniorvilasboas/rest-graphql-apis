const findAll = (req, res) => {
  res.send({
    products: ['All products']
  })
}

const findOne = (req, res) => {
  res.send({
    name: 'Product ' + req.params.id
  })
}

const create = (req, res) => {
  console.log(req.body)
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