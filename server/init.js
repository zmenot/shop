require('dotenv').config();
const { sequelize } = require('./sequelize.db.config');
const { User } = require('./models/');
const bcrypt = require('bcrypt');

const init = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    const hashPassword = await bcrypt.hash('123456789aa', 6);
    await User.create({
      name: 'Admin',
      surname: 'Admin',
      phone: '',
      email: 'admin@admin.ru',
      password: hashPassword,
      address: '',
      role: 'ADMIN',
    });
  } catch (error) {
    console.log(error);
  }
};

init();
