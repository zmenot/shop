const router = require('express').Router();
const productController = require('../controllers/product');

router.get('/getAll', productController.getAll);
router.post('/create', productController.create);
router.post('/update', productController.update);
router.post('/delete', productController.deleteOne);

module.exports = router;
