'use strict';

const { TE, to } = require('../services/util.service');
const CONFIG = require('../config/app_config');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Contact', {
        contact_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
        name:{type: DataTypes.STRING, allowNull: false},
        email : {type: DataTypes.STRING, allowNull: true, unique: true, validate: { isEmail: {msg: "email invalid."} }},
        contact_no:{type: DataTypes.INTEGER, allowNull: false},
        msg:{type: DataTypes.STRING, allowNull: false}
         
    }, {
            timestamps: true,
            deletedAt: 'deletedAt',
            tableName: "contacts"

        }
         );
    sequelize.sync({
        force: false,
        logging: true,
        // alter: true
    })

    
       
     return Model;
}