const { Sequelize } = require('sequelize');

// Database connection
const sequelize = new Sequelize('productdb','root','',
   {
  host: 'localhost',
  dialect: 'mysql',
});

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connected to the MySQL database: productdb');
//     } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// })();

module.exports = sequelize;
