const express = require ('express');
const productController = require('../controllers/product_controller')

const upload = require('../middlewares/upload')

const route = express.Router();
/**prend images 7othom fi req.files */

route.post('/addimage/:id', upload.array('images'), productController.addProductImage)

route.delete('/ImageId', productController.deleteImageById) 

module.exports = route
