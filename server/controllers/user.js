const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/');
const { Basket } = require('../models/');

const { validationResult } = require('express-validator');

const getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({ where: { role: 'USER' } });
    // users.
    return res.status(200).json({ users });
  } catch (e) {
    res.status(400).json({ message: 'get all users error' });
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    return res.status(200).json({ message: 'user deleted !' });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: 'delete user error' });
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id, name, surname, address, phone, email } = req.body;
    const user = await User.findOne({ where: { id } });
    user.name = name;
    user.surname = surname;
    user.address = address;
    user.phone = phone;
    user.email = email;
    await user.save();
    return res.status(200).json({ user });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: 'user updated error' });
  }
};

const registration = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    console.log();
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    const { name, surname, phone, email, password, address } = req.body;
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует.' });
    }
    const hashPassword = await bcrypt.hash(password, 6);
    const user = await User.create({
      name,
      surname,
      phone,
      email,
      password: hashPassword,
      address
    });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user);
    return res.status(200).json({ token });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'registration error' });
  }
};

const authorization = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    console.log();
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Пользователь с таким email не найден.' });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({ message: 'Неверный пароль.' });
    }

    const token = generateJwt(user);

    return res.status(200).json({ token });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'authorization error' });
  }
};

const auth = async (req, res, next) => {
  try {
    const { email } = req.user;
    console.log(req.user);
    const user = await User.findOne({ where: { email } });
    const token = generateJwt(user);
    return res.status(200).json({ token });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'auth error 3' });
  }
};

const generateJwt = ({ id, name, surname, phone, email, password, role, address }) => {
  return jwt.sign({ id, name, surname, phone, email, password, role, address }, process.env.SECRET_KEY, {
    expiresIn: '3h',
  });
};

module.exports = { getAll, registration, authorization, auth, deleteById, updateById };
