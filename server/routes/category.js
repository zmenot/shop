const router = require('express').Router();
const categoryController = require('../controllers/category');

router.get('/getAll', categoryController.getAll);
router.post('/create', categoryController.create);
router.post('/delete', categoryController.deleteOne);
router.post('/update', categoryController.updateOne);

// router.post('/update', categoryController.update);

module.exports = router;
