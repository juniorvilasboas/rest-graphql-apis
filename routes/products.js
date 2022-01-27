const express = require('express')

const router = express.Router()

const productController = require('../controllers/products')

router.get('/', productController.findAll)
router.get('/paginated', productController.findAllPagi)
router.get('/:id', productController.findOne)
router.patch('/:id', productController.patch)
router.post('/', productController.create)
router.put('/:id', productController.edit)
router.delete('/:id', productController.remove)

module.exports = router