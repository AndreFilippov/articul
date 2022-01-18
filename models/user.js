const sequelize = require('../database/database')
const { DataTypes } = require("sequelize");
const {userNotFound} = require("../exceptions/exception");

const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(700)
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    age: {
        type: DataTypes.INTEGER({
            length: 3
        })
    }
}, {
    tableName: 'users',
    timestamps: false,
});

User.validateAge = (age) => (age > 0 && age < 200)
User.findByIdOrFail = async (id) => {
    const user = await User.findByPk(id);
    if(!user) throw userNotFound();
    return user;
};
module.exports = User;