const { DataTypes } = require('sequelize');
const User = require('../models/User');
const db = require('../db');

const Transaction = db.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    kind: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
}, {
    timestamps: true,
});

User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

module.exports = Transaction;