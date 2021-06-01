const router = require('express').Router();
const userController = require('../controllers/user');
const { authMiddleware } = require('../middleware/authMiddleware');
const { check } = require('express-validator');

router.get('/getAll', userController.getAll);
router.delete('/delete/:id', userController.deleteById);
router.post('/update', userController.updateById);

router.post(
  '/registration',
  [
    check('name', 'Имя пользователя не может быть пустым').notEmpty(),
    check('surname', 'Фамилия пользователя не может быть пустым').notEmpty(),
    check('address', 'Адрес пользователя не может быть пустым').notEmpty(),
    check('phone', 'Телефон пользователя не может быть пустым').notEmpty(),
    check('email', 'Почта пользователя не может быть пустым').notEmpty(),
    check('email', 'Почта не является валидной.').isEmail(),
    check('password', 'Пароль пользователя не может быть пустым').notEmpty(),
  ],
  userController.registration
);
router.post(
  '/authorization',
  [
    check('email', 'Почта пользователя не может быть пустым').notEmpty(),
    check('email', 'Почта не является валидной.').isEmail(),
    check('password', 'Пароль пользователя не может быть пустым').notEmpty(),
  ],
  userController.authorization
);
router.get('/auth', authMiddleware, userController.auth);
module.exports = router;
