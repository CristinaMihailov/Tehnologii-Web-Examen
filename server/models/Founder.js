const sequelize = require('../sequelize');
const {DataTypes} = require('sequelize');

const Founder = sequelize.define('founder', {
    id:{
        type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
    },
    nume:{
        type: DataTypes.STRING,
            validate:{
                min:5,
            },
            allowNull: false
    },
    rol:{
        type: DataTypes.STRING,
        allowNull: false,
        values: ['CEO', 'CTO', 'CFO', 'CIO', 'COO', 'CMO']
    }

});

module.exports = Founder;