const sequelize = require('../sequelize');
const {DataTypes} = require('sequelize');

const Comapany = sequelize.define('company', {
    id:{
        type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
    },
    nume:{
        type: DataTypes.STRING,
            validate:{
                min:3,
            },
            allowNull: false
    },
    data:{
        type: DataTypes.DATEONLY,
        allowNull: false
    }

});

module.exports = Comapany;