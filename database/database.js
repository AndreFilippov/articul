const { Sequelize } = require('sequelize');
const { database } = require('../environments/environment');

const sequelize = new Sequelize({
    host: database.host,
    username: database.username,
    password: database.password,
    database: database.name,
    dialect: 'mysql',
    logging: false
});

sequelize.sync()
    .then(r => console.log('Database success update'))
    .catch(e => { console.error(`Database error update: ${e.message}`); process.exit() });

module.exports = sequelize;