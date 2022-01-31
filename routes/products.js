const express = require('express')

const router = express.Router()

const productController = require('../controllers/products')

router.get('/', productController.findAll)
router.get('/paginated', productController.findAllPaginated)
router.get('/:id', productController.findOne)

router.patch('/:id', productController.patch)
router.put('/:id', productController.edit)

router.post('/', productController.create)
router.post('/:id/images', productController.createImage)

router.delete('/:id', productController.remove)
router.delete('/:productId/images/:id', productController.removeImage)

module.exports = router
