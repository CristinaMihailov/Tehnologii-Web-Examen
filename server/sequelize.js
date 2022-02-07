const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('examenTW', 'postgres', 'cristina', {
    host: 'localhost',
    dialect: 'postgres'
  });

module.exports = sequelize;
