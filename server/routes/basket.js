const router = require('express').Router();
const basketController = require('../controllers/basket');

router.post('/', basketController.getBasketByUserId);
router.post('/deleteProduct', basketController.deleteProductInBasket);
router.post('/addProduct', basketController.addProductInBasket);
router.post('/updateCountProduct', basketController.updateCountProduct);

module.exports = router;
