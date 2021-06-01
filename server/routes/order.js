const router = require('express').Router();
const orderController = require('../controllers/order');

router.post('/create', orderController.create);
router.get('/getAll', orderController.getAll);
router.post('/update', orderController.update);
router.post('/delete', orderController.deleteOne);

module.exports = router;
