'use strict';

const { TE, to } = require('../services/util.service');
const CONFIG = require('../config/app_config');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('User', {
        user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
        email : {type: DataTypes.STRING, allowNull: true, unique: true, validate: { isEmail: {msg: "email invalid."} }},
        password:{type: DataTypes.STRING, allowNull: false} 
         
    }, {
            timestamps: true,
            deletedAt: 'deletedAt',
            tableName: "users"

        }
         );
    sequelize.sync({
        force: false,
        logging: true,
        // alter: true
    })

    
       
     return Model;
}