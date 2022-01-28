const express = require('express')
const categoryController = require('../controllers/categories')

const router = express.Router()

router.get('/', categoryController.findAll)
router.get('/:id', categoryController.findOne)
router.post('/', categoryController.create)
router.put('/:id', categoryController.edit)
router.delete('/:id', categoryController.remove)

module.exports = router