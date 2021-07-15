const Router = require('express');
const router = new Router();

const productController = require('../controllers/productController');

router.get('/', productController.get);
router.post('/create', productController.create);
router.delete('/delete_sku/:sku', productController.delete_bysku);
router.delete('/delete_id/:id', productController.delete_byid);
router.put('/update', productController.update);

module.exports = router